import { BaseAINode } from "./BaseAINode";
import { fetchAIResponse } from "../utils/api";

export class PromptNode extends BaseAINode {
  constructor() {
    super("AI Prompt");
    this.addInput("Input Data", "string");
    this.addInput("Prompt Template", "string");
    this.addOutput("AI Response", "string");
    this.properties = {
      apiKey: "",
      model: "gpt-4",
      temperature: 0.7,
    };
  }

  async onExecute() {
    const inputData = this.getInputData<string>(0) || "";
    const promptTemplate = this.getInputData<string>(1) || "Summarize: {input}";
    const prompt = promptTemplate.replace("{input}", inputData);

    try {
      const response = await fetchAIResponse(
        prompt,
        this.properties.apiKey,
        this.properties.model,
        this.properties.temperature
      );
      this.setOutputData(0, response);
    } catch (error) {
      console.error("PromptNode Error:", error);
      this.setOutputData(0, "Error: " + (error as Error).message);
    }
  }
}
