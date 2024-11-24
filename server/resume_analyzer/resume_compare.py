import os
import re
import yaml
from resume_analyzer import ResumeAnalyzer
from groq import Groq
from dotenv import load_dotenv


class ResumeComparator:
    def __init__(self, resume1: dict[str, str], resume2: dict[str, str], jd: str, config_path: str = os.path.join(os.path.abspath(os.curdir), 'server', 'config.yaml')):
        """
        Initializes the ResumeComparator with two resumes and a job description.

        Args:
            resume1 (dict): Dictionary with the first resume sections as keys and their content as values.
            resume2 (dict): Dictionary with the second resume sections as keys and their content as values.
            jd (str): The job description.
        """
        load_dotenv()
        self.resume1 = resume1
        self.resume2 = resume2
        self.jd = jd
        self.analyzer1 = ResumeAnalyzer(resume1, jd)
        self.analyzer2 = ResumeAnalyzer(resume2, jd)
        self.groq_api_key = os.getenv('GROQ')
        with open(config_path, 'r') as file:
            self.config = yaml.safe_load(file)['sections_analyzer']
        self.client = Groq(api_key=self.groq_api_key)

    def compare_sections(self, section1: str, section2: str):
        response = self.client.chat.completions.create(
            model=self.config["model"],
            messages=[
                {"role": "system",
                 "content": self.config['section_wise_prompt']},
                {"role": "system",
                    "content": "Always return in plain text. Don't add backslashes."},
                {"role": "user", "content": f"First Resume: {section1}"},
                {"role": "user", "content": f"Second Resume: {section2}"},
                {"role": "user", "content": "Compare the two resumes and provide a concise comparison."}
            ],
            temperature=0,
            max_tokens=2048,
            stream=False
        )
        comparison = response.choices[0].message.content

        comparison = re.sub(r'<output>', '', comparison)
        comparison = re.sub(r'<\/output>', '', comparison)
        return comparison

    def compare_summaries(self, summary1: str, summary2: str):
        response = self.client.chat.completions.create(
            model=self.config["model"],
            messages=[
                {"role": "system",
                 "content": self.config['resume_compare_prompt']},
                {"role": "system",
                    "content": "Always return in plain text. Don't add backslashes."},
                {"role": "user", "content": f"Summary for the first resume: {summary1}"},
                {"role": "user", "content": f"Summary for the second resume: {summary2}"},
                {"role": "user", "content": "Compare the two summaries and Please provide a detailed comparison."}
            ],
            temperature=0,
            max_tokens=2048,
            stream=False
        )
        comparison_summary = response.choices[0].message.content

        comparison_summary = re.sub(
            r'<output>\n<comparison>\n', '', comparison_summary)
        comparison_summary = re.sub(
            r'\n<\/comparison>\n<\/output>', '', comparison_summary)

        return comparison_summary

    def get_comparision(self):
        print('Analysing the first Resume')
        scores1, final_reviews1, summaries1 = self.analyzer1.get_analysis()
        print('Analysing the second Resume')
        scores2, final_reviews2, summaries2 = self.analyzer2.get_analysis()
        print('Gone through the analysis')
        print('Let me compare the two resumes')
        summaries = self.compare_summaries(summaries1, summaries2)
        print('Compared the summaries')

        print('Let me summarize the findings')
        finishing_summary = self.compare_sections(
            final_reviews1, final_reviews2)
        print('Summarized the findings')

        complete_comparision = {
            "scores": {
                "resume1": scores1,
                "resume2": scores2
            },
            "final_reviews": {
                "resume1": final_reviews1,
                "resume2": final_reviews2
            },
            "resume_wise_summaries": {
                "resume1": summaries1,
                "resume2": summaries2
            },
            "detailed_summary": summaries,
            "final_summary": finishing_summary
        }

        return complete_comparision


if __name__ == '__main__':
    resume1 = {
        "Education": "B.Tech in Computer Science",
        "Experience": "Worked as a Software Developer for 2 years",
        "Skills": "Python, Java, C++, JavaScript",
        "Projects": "Developed a web application using Django",
        "Certifications": "Certified AWS Developer"
    }
    resume2 = {
        "Education": "M.Tech in Computer Science",
        "Experience": "Worked as a Software Engineer for 3 years",
        "Skills": "Python, Java, C++, JavaScript, SQL",
        "Projects": "Developed a mobile application using Flutter",
        "Certifications": "Certified Azure Developer"
    }
    jd = "We are looking for a Software Developer with experience in Python"
    comparator = ResumeComparator(resume1, resume2, jd)
    comparison_results = comparator.get_comparision()
    print(comparison_results)
