import bem from '@fesk/react-bem';
import './EditorLayout.scss';

export default bem('annotation-studio-editor-layout', editor => ({
  EditorLayout: editor,
  Content: editor.element('content'),
  Viewer: editor.element('viewer'),
  Properties: editor.element('properties'),
}));
