import { BaseAINode } from "./BaseAINode";

export class OutputNode extends BaseAINode {
  outputValue: string = "";

  constructor() {
    super("Output");
    this.addInput("Data", "string");
    this.properties = {
      outputType: "console",
      fileName: "output.txt",
    };
  }

  onExecute() {
    const inputData = this.getInputData<string>(0);
    this.outputValue = inputData || "";

    switch (this.properties.outputType) {
      case "console":
        console.log("Output:", this.outputValue);
        break;
      case "alert":
        alert(this.outputValue);
        break;
      case "file":
        // In real implementation would save to file
        console.log(
          "Would save to file:",
          this.properties.fileName,
          this.outputValue
        );
        break;
    }
  }

  getOutput() {
    return this.outputValue;
  }
}
