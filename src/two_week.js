import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Tool } from "@langchain/core/tools";
import { LLMChain } from "@langchain/core/chains";
import { AgentExecutor } from "@langchain/core/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";

async function run() {
  const geminiApiKey = process.env.GOOGLE_API_KEY;

  // Modelo
  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: geminiApiKey,
  });

  // Tool
  const SearchTool = new Tool({
    name: "SearchTool",
    description: "Procura informações sobre um tópico",
    func: async (input) => `Resultado da pesquisa sobre "${input}"`,
  });

  // Prompt
  const prompt = ChatPromptTemplate.fromTemplate(
    `Você é um professor. Explique {topic} para uma criança de 10 anos.`
  );

  // Chain
  const chain = new LLMChain({ llm, prompt });

  // Agent executor
  const agent = new AgentExecutor({
    tools: [SearchTool],
    chain,
    verbose: true, // para ver o que ele está fazendo
  });

  const result = await agent.call({ topic: "LangChain" });

  console.log(result.output_text);
}

run();
