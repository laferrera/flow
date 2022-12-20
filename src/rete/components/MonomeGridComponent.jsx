import Rete from "rete";
import { btNode } from "./btNode.jsx";
import { numSocket } from "./numSocket.js";
import config from "../../renderer/nodeConfigs/monomeGridConfig.js";
import { deepCopy, checkInputsAndSetData } from "./utils.js";
export class MonomeGridComponent extends Rete.Component {
  constructor() {
    super("Grid");
    this.data.component = btNode; // optional
    this.path = ["Monome"];
  }

  builder(node) {
    var inpX = new Rete.Input("x", "X", numSocket);
    var inpY = new Rete.Input("y", "Y", numSocket);
    var inpState = new Rete.Input("state", "State", numSocket);
    var outX = new Rete.Output("x", "X", numSocket);
    var outY = new Rete.Output("y", "Y", numSocket);
    var outState = new Rete.Output("state", "State", numSocket);
    if(!node.data.config) { node.data.config = deepCopy(config) }

    node.data.x = 0;
    node.data.y = 0;
    node.data.state = 0;
    
    return node
      .addInput(inpX)
      .addInput(inpY)
      .addInput(inpState)
      .addOutput(outX)
      .addOutput(outY)
      .addOutput(outState);
  }

  worker(node, inputs, outputs) {
    checkInputsAndSetData(inputs,node.data);
    console.log("grid node.data", node.data.x, node.data.y, node.data.state);
    outputs['x'] = node.data.x;
    outputs['y'] = node.data.y;
    outputs["state"] = node.data.state;
  }
}