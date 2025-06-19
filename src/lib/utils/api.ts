import OpenAI from "openai";

export async function fetchAIResponse(
  prompt: string,
  apiKey: string,
  model: string = "gpt-4",
  temperature: number = 0.7
): Promise<string> {
  if (!apiKey) {
    throw new Error("OpenAI API key is required");
  }

  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature,
    });
    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error(`Failed to get AI response: ${(error as Error).message}`);
  }
}
