import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import bem from '@fesk/react-bem';

const JSONExport = bem(
  'json-export',
  jsonExport => ({
    JsonExport: jsonExport,
    Header: jsonExport.element('header'),
    Pre: jsonExport.element('pre').asTag('pre'),
    Code: jsonExport.element('code').asTag('code'),
    ButtonBar: jsonExport.element('button-bar'),
  }),
  ({ JsonExport, Header, Pre, Code, ButtonBar }, props) => {
    const { manifestJson, copied } = props;
    const manifestJsonStr = JSON.stringify(manifestJson, null, 2);
    return (
      <JsonExport>
        {props.hideTitle ? '' : <Header>{props.title || 'Export Json'}</Header>}
        <Pre>
          <Code>{manifestJsonStr}</Code>
        </Pre>
        <ButtonBar>
          {props.showCopyToClipboard ? (
            <CopyToClipboard
              onCopy={(ev, asd) => console.log(ev, asd)}
              text={manifestJsonStr}
            >
              <button>{props.copyButtonText || 'Copy to clipboard'}</button>
            </CopyToClipboard>
          ) : (
            ''
          )}
          {props.children}
        </ButtonBar>
      </JsonExport>
    );
  }
);

export default JSONExport;
