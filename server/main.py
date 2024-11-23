from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()
GROQ = os.getenv("GROQ")

client = Groq(api_key=GROQ)
completion = client.chat.completions.create(
    model="llama-3.2-90b-text-preview",
    messages=[{"role": "user", "content": "Hello, how are you?"}],
    temperature=0,
    max_tokens=1024,
    stream=False
)


print(completion.choices[0].message.content)


class GroqAPI:
    def __init__(self):
        self.client = Groq(api_key=GROQ)

    def consume_groq(self, resume):
        completion = self.client.chat.completions.create(
            model="llama-3.2-90b-text-preview",
            messages=[{"role": "user", "content": resume}],
            temperature=0,
            max_tokens=1024,
            stream=False
        )
        return completion.choices[0].message.content
    
    