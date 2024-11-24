from langchain_community.document_loaders import UnstructuredPDFLoader
from groq import Groq
from dotenv import load_dotenv
import yaml
import re
import os


class DocumentExtractor:
    def __init__(self, file_path: str, config_path: str = os.path.join(os.path.abspath(os.curdir), 'server', 'config.yaml')):
        load_dotenv()
        self.file_path = os.path.join(
            os.path.abspath(os.curdir), 'uploads', file_path)
        self.groq_api_key = os.getenv('GROQ')
        with open(config_path, 'r') as file:
            self.config = yaml.safe_load(file)['document_extractor']

    def extract_docs(self):
        docs = UnstructuredPDFLoader(
            self.file_path, mode='elements', strategy='fast').load()
        return docs

    def generate_intermediate(self):
        complete_doc_string = ''
        complete_doc_list = []

        for doc in self.extract_docs():
            page_cont = doc.page_content
            complete_doc_string += page_cont
            complete_doc_list.append(page_cont)

        return complete_doc_list, complete_doc_string

    def get_completion(self, complete_doc_string, temperature=0, max_tokens=1024):
        client = Groq(api_key=self.groq_api_key)
        completion = client.chat.completions.create(
            model=self.config["model"],
            messages=[{"role": "system", "content": self.config['system_prompt']},
                      {"role": "user", "content": complete_doc_string}],
            temperature=temperature,
            max_tokens=max_tokens,
            stream=False
        )
        return completion

    def extract_sections(self, sections):
        try:
            pattern = r'<output>(.*)<\/output>'
            sections = re.search(pattern, sections).group(1)
            sections = sections.split(';')
            sections = [section.strip() for section in sections]
        except Exception:
            sections = []

        return sections

    def get_section_ranges(self, sections, complete_doc_list):
        section_ranges = {}
        for i, section in enumerate(sections):
            for index, doc in enumerate(complete_doc_list):
                if section in doc:
                    section_ranges[section] = index
                    print(f"Section {i+1}: {section}, at index: {index}")

        ranges = list(zip(section_ranges.values(),
                      list(section_ranges.values())[1:]))
        ranges.append((ranges[-1][1], len(complete_doc_list)))

        return section_ranges, ranges

    def get_section_wise_text(self, section_ranges, ranges, complete_doc_list):
        sections_list = list(section_ranges.keys())
        section_wise_content = {}
        for i, range_ in enumerate(ranges):
            section_content = []
            section_name = sections_list[i]
            print(f"Section {section_name} starts at index: {
                  range_[0]} and ends at index: {range_[1]}")
            for j in range(range_[0] + 1, range_[1]):
                section_content.append(complete_doc_list[j])
            section_wise_content[section_name] = section_content

        return section_wise_content

    def extract_entities(self, temperature=0, max_tokens=1024):
        complete_doc_list, complete_doc_string = self.generate_intermediate()

        completion = self.get_completion(
            complete_doc_string, temperature, max_tokens)

        sections = self.extract_sections(
            completion.choices[0].message.content.replace('\n', ''))

        section_ranges, ranges = self.get_section_ranges(
            sections, complete_doc_list)

        section_wise_content = self.get_section_wise_text(
            section_ranges, ranges, complete_doc_list)

        return section_wise_content


if __name__ == '__main__':
    extractor = DocumentExtractor(
        '/home/shounakpaul/Code/resume-score-app/server/Shounak Paul - Resume.pdf')
    print(extractor.extract_entities())
