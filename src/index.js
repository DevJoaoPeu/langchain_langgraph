import 'dotenv/config';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function run() {
  const geminiApiKey = process.env.GOOGLE_API_KEY;

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: geminiApiKey,
  });

  const parser = new StringOutputParser();

  const prompt = ChatPromptTemplate.fromTemplate(
    `Você é um professor.
    Explique {topic} para uma criança de 10 anos.`
  );

  const chain = prompt.pipe(model).pipe(parser);

  // Aqui usamos model.invoke com o prompt formatado
  const response = await chain.invoke({ 
    topic: "Machine Learning" 
  });

  console.log(response);
}

run();
