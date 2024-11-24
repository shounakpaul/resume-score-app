import os
import re
import yaml
from dotenv import load_dotenv
from groq import Groq


class ResumeAnalyzer:

    def __init__(self, data: dict[str, str], jd: str, config_path: str = os.path.join(os.path.abspath(os.curdir), 'server', 'config.yaml')):
        load_dotenv()
        self.data = data
        self.jd = jd
        self.groq_api_key = os.getenv('GROQ')
        with open(config_path, 'r') as file:
            self.config = yaml.safe_load(file)['sections_analyzer']
        self.client = Groq(api_key=self.groq_api_key)

    def get_review_scores(self):
        reviews = {}
        for keys in self.data.keys():
            completion = self.client.chat.completions.create(
                model=self.config["model"],
                messages=[
                    {"role": "system",
                        "content": self.config['score_system_prompt']},
                    {"role": "user", "content": f"Job Description: {self.jd}"},
                    {"role": "user", "content": f"Section: {
                        keys}\n  Section Content: {self.data[keys]}"}
                ],
                temperature=0,
                max_tokens=2048,
                stream=False
            )
            reviews[keys] = completion.choices[0].message.content.replace(
                '\n', '')
        return reviews

    def post_processing_scores_final_reviews(self, reviews):
        scores = {}
        final_reviews = {}
        for key, review in reviews.items():
            pattern = r'<output>(.*)<\/output>'
            pattern_sub = r'<output>.*<\/output>'
            review_str = re.sub(pattern_sub, '', review)
            curr = re.search(pattern, review).group(
                1).replace('NA', '0.0').split(';')
            relevance_score, skills_match_score, structure_score, personalization_score, readability_score, impact_score, overall_score = curr
            data = {
                "relevance_score": float(relevance_score) * 100,
                "structure_score": float(structure_score) * 100,
                "personalization_score": float(personalization_score) * 100,
                "readability_score": float(readability_score) * 100,
                "impact_score": float(impact_score) * 100,
                "overall_score": float(overall_score) * 100
            }
            scores[key] = data
            final_reviews[key] = review_str
        return scores, final_reviews

    def get_summaries(self, final_reviews):
        summaries = {}
        for key, review__s in final_reviews.items():
            completion = self.client.chat.completions.create(
                model=self.config["model"],
                messages=[
                    {"role": "system",
                        "content": self.config['summarizer_system_prompt']},
                    {"role": "user", "content": f"Job Description: {self.jd}"},
                    {"role": "user", "content": f"Section: {
                        key}\n  Section Content: {review__s}"}
                ],
                temperature=0,
                max_tokens=2048,
                stream=False
            )
            pattern = r'<summary>(.*)<\/summary>'
            summaries[key] = re.search(
                pattern, completion.choices[0].message.content.replace('\n', '')).group(1)
        return summaries

    def get_analysis(self):
        reviews = self.get_review_scores()
        print('Got reviews')
        scores, final_reviews = self.post_processing_scores_final_reviews(
            reviews)
        print('Processed reviews and calculated scores')
        summaries = self.get_summaries(final_reviews)
        print('Generated summaries')
        return scores, final_reviews, summaries


if __name__ == '__main__':
    data = {
        "Education": "B.Tech in Computer Science",
        "Experience": "Worked as a Software Developer for 2 years",
        "Skills": "Python, Java, C++, JavaScript",
        "Projects": "Developed a web application using Django",
        "Certifications": "Certified AWS Developer"
    }
    jd = "We are looking for a Software Developer with experience in Python"
    sections_analyzer = ResumeAnalyzer(data, jd)
    scores, final_reviews, summaries = sections_analyzer.get_analysis()
    print(scores)
    print(final_reviews)
    print(summaries)
