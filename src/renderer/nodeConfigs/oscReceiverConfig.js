let oscReceiverConfig = {
  address: {
    value: "/note_on",
    name: "Address",
    type: "string",
    ui: "text",
    label: "Address",
  },
  addOutput: {
    name: "Add Output",
    type: "button",
    ui: "button",
    label: "Add Output",
    rendererEmitterCall: "addOutput",
  },
  removeInput: {
    name: "Remove Output",
    type: "button",
    ui: "button",
    label: "Remove Output",
    rendererEmitterCall: "removeOutput",
  },
};
export default oscReceiverConfig;