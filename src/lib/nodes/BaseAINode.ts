import { LGraphNode } from "litegraph.js";

export abstract class BaseAINode extends LGraphNode {
  title: string;
  properties: Record<string, any>;

  constructor(title: string) {
    super(title);
    this.title = title;
    this.properties = {};
  }

  // 添加输入端口
  addInput(name: string, type: string) {
    super.addInput(name, type);
  }

  // 添加输出端口
  addOutput(name: string, type: string) {
    super.addOutput(name, type);
  }

  // 抽象方法：节点执行逻辑
  abstract onExecute(): Promise<void> | void;

  // 获取输入数据
  protected getInputData<T>(index: number): T {
    return this.getInputData(index) as T;
  }

  // 设置输出数据
  protected setOutputData(index: number, data: any) {
    this.setOutputData(index, data);
  }
}
