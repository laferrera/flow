import Rete from "rete";
import { btNode } from "./btNode.jsx";
import { numSocket } from "./numSocket.js";
import { oscEmitterConfig } from "../renderer/nodeConfigs/oscEmitterConfig.js";
import { configBuilder } from "./configBuilder.js";
import { emitterEmitter } from "./emitterEmitter.js";
export class OSCEmitterComponent extends Rete.Component {
  constructor() {
    super("OSC Emitter");
    this.data.component = btNode;
  }

  builder(node) {
    let inp = new Rete.Input('num1', "Number", numSocket);
    // inp.addControl(new NumControl(this.editor, "num", node));
    node.data.configType = Object.keys({ oscEmitterConfig }).pop()
    node.data.config = configBuilder(oscEmitterConfig);
    return node
      .addInput(inp);

  }

  worker(node, inputs, outputs) {
    // we dont have any outputs for Emitter
    node.data.num = inputs['num1'];
    emitterEmitter.emit("osc-message", node);
  }

}