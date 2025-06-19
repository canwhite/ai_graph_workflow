import { BaseAINode } from "./BaseAINode";

export class DataProcessorNode extends BaseAINode {
  constructor() {
    super("Data Processor");
    this.addInput("Input Data", "string");
    this.addOutput("Processed Data", "string");
    this.properties = {
      transform: "uppercase",
      trim: true,
      maxLength: 0,
    };
  }

  onExecute() {
    let inputData = this.getInputData<string>(0) || "";

    // Apply transformations
    if (this.properties.trim) {
      inputData = inputData.trim();
    }

    switch (this.properties.transform) {
      case "uppercase":
        inputData = inputData.toUpperCase();
        break;
      case "lowercase":
        inputData = inputData.toLowerCase();
        break;
      case "capitalize":
        inputData = inputData.charAt(0).toUpperCase() + inputData.slice(1);
        break;
    }

    if (
      this.properties.maxLength > 0 &&
      inputData.length > this.properties.maxLength
    ) {
      inputData = inputData.substring(0, this.properties.maxLength) + "...";
    }

    this.setOutputData(0, inputData);
  }
}
