"use client";
import { useEffect, useRef, useState } from "react";
import { LiteGraph, LGraph, LGraphCanvas } from "litegraph.js";
import { registerNodes } from "@/lib/registerNodes";
import { PromptNode } from "@/lib/nodes/PromptNode";
import { DataProcessorNode } from "@/lib/nodes/DataProcessorNode";
import { OutputNode } from "@/lib/nodes/OutputNode";
import "litegraph.js/css/litegraph.css";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [apiKey, setApiKey] = useState("");
  const graphRef = useRef<LGraph | null>(null);

  useEffect(() => {
    // Initialize graph
    const graph = new LGraph();
    graphRef.current = graph;

    const canvas = new LGraphCanvas(canvasRef.current!, graph);

    // Register custom nodes
    registerNodes();

    // Example node setup using direct instantiation
    const promptNode = new PromptNode();
    promptNode.pos = [100, 100];
    promptNode.properties.apiKey = apiKey;
    graph.add(promptNode);

    const processorNode = new DataProcessorNode();
    processorNode.pos = [400, 100];
    graph.add(processorNode);

    const outputNode = new OutputNode();
    outputNode.pos = [700, 100];
    graph.add(outputNode);

    // Connect nodes
    promptNode.connect(0, processorNode, 0);
    processorNode.connect(0, outputNode, 0);

    // Start graph
    graph.start();

    return () => {
      graph.stop();
    };
  }, [apiKey]);

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-gray-100">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter OpenAI API Key"
          className="p-2 border rounded"
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full border" />
      </div>
    </div>
  );
}
