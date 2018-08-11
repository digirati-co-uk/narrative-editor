import bem from '@fesk/react-bem';
import './Editor.scss';

const Editor = bem('annotation-studio-editor', editor => ({
  Main: editor,
  Content: editor.element('content'),
  Viewer: editor.element('viewer'),
  Properties: editor.element('properties'),
}));

export default Editor;
