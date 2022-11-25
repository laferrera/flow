function install(editor) {
  editor.view.container.focus();
  let commanded = false

  editor.on('keydown', e => {
    switch (e.code) {
      case 'MetaLeft':
      case 'MetaRight':
        commanded = true;
        break;
      case 'KeyI': 
      console.log('selected nodes')
        console.log(editor.selected);
        break;
      case 'Backspace':
        editor.selected.each(n => 
          editor.removeNode(n)
        );
        editor.selected.list = []
        break;
      case 'Space':
        let rect = editor.view.container.getBoundingClientRect();
        let event = new MouseEvent('contextmenu', {
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2
        });

        editor.trigger('contextmenu', { e: event, view: editor.view });
        break;
      case 'KeyZ':
        if (commanded) {
          editor.trigger('undo');
        }
      default: break;
    }
  });

  editor.on('keyup', e => {
    switch (e.code) {
      case 'MetaLeft':
      case 'MetaRight':
        commanded = false;
        break;
      default: break;
    }
  });


}

export default {
  install
}