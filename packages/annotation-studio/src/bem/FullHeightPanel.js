import bem from '@fesk/react-bem';
import './FullHeightPanel.scss';

// These should be in a separate package as fesk-react-layout-helpers or such
// And when we start a new project we shouldn't need to create these over and over again.
const FullHeightPanel = bem('full-height-panel', fullHeightPanel => ({
  Main: fullHeightPanel,
  Content: fullHeightPanel.element('content'),
  ButtonBar: fullHeightPanel.element('button-bar'),
}));

export default FullHeightPanel;
