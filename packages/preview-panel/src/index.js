import React, { Component } from 'react';
import bem from '@fesk/react-bem';

// This is just temporary until the canvas panel also been merged to the master
const TEMPORARY_PREVIEW_URL =
  'https://deploy-preview-150--canvas-panel.netlify.com/#/examples/';

const TEMPORARY_PREVIEW_PARAMS = '?no-header=1&manifest=';

const createURLForManifest = (manifestJson, experience) => {
  const temporaryManifest = btoa(JSON.stringify(manifestJson));
  return `${TEMPORARY_PREVIEW_URL}${experience}${TEMPORARY_PREVIEW_PARAMS}data:application/json;base64,${temporaryManifest}`;
};

const PreviewPanel = bem(
  'preview-panel',
  previewPanel => ({
    PreviewPanelBlock: previewPanel,
    Header: previewPanel.element('header'),
    PreviewContent: previewPanel.element('content'),
    ButtonBar: previewPanel.element('button-bar'),
  }),
  ({ PreviewPanelBlock, Header, PreviewContent, ButtonBar }, props) => {
    return (
      <PreviewPanelBlock>
        {props.hideTitle ? (
          ''
        ) : (
          <Header>{props.title || 'Preview Narrative'}</Header>
        )}
        <PreviewContent>
          <iframe
            src={createURLForManifest(props.manifestJson, props.experience)}
          />
        </PreviewContent>
        <ButtonBar>{props.children}</ButtonBar>
      </PreviewPanelBlock>
    );
  }
);

export default PreviewPanel;
