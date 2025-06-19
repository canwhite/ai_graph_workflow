import { LiteGraph } from "litegraph.js";
import { PromptNode } from "./nodes/PromptNode";
import { DataProcessorNode } from "./nodes/DataProcessorNode";
import { OutputNode } from "./nodes/OutputNode";

export function registerNodes() {
  LiteGraph.registerNodeType("ai/Prompt", PromptNode);
  LiteGraph.registerNodeType("ai/DataProcessor", DataProcessorNode);
  LiteGraph.registerNodeType("ai/Output", OutputNode);

  // Add node categories for better organization
  LiteGraph.registerNodeType("ai/Prompt", PromptNode, { category: "AI" });
  LiteGraph.registerNodeType("ai/DataProcessor", DataProcessorNode, {
    category: "Processing",
  });
  LiteGraph.registerNodeType("ai/Output", OutputNode, { category: "Output" });
}

// Add to global scope for LiteGraph editor
declare global {
  interface Window {
    registerNodes: typeof registerNodes;
  }
}

if (typeof window !== "undefined") {
  window.registerNodes = registerNodes;
}
