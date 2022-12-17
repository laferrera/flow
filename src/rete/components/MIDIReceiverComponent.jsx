import Rete from "rete";
import { btNode } from "./btNode.jsx";
import { numSocket } from "./numSocket.js";
import config from "../../renderer/nodeConfigs/midiReceiverConfig.js";
import { deepCopy } from "./utils.js";

export class MIDIReceiverComponent extends Rete.Component {
  constructor() {
    super("MIDI Receiver");
    this.data.component = btNode;
    this.path = ["MIDI"];
  }

  builder(node) {
    // we dont have any inputs for Receive
    let noteOut = new Rete.Output("noteOut", "Note", numSocket);
    let velocityOut = new Rete.Output("velocityOut", "Velocity", numSocket);
    node.data.config = deepCopy(config);

    // let ctrl = new MIDIReceiveControl(this.editor, 'config', node);
    return (
      node
        // .addControl(ctrl)
        .addOutput(noteOut)
        .addOutput(velocityOut)
    );
  }

  worker(node, inputs, outputs) {
    // we dont have any inputs for Receive
    outputs["noteOut"] = node.data.noteOut;
    outputs["velocityOut"] = node.data.velocityOut;
  }
}