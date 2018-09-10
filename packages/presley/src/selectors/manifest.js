import { createSelector } from 'reselect';
import * as canvasSelector from './canvas';
import * as tileSourceSelector from './tileSource';
import * as annotationsSelector from './annotations';

export const getRoot = state => state.metadata;
export const getLabel = createSelector(getRoot, metadata => metadata.label);
export const getSummary = createSelector(getRoot, metadata => metadata.summary);
export const getRequiredStatement = createSelector(
  getRoot,
  metadata => metadata.requiredStatement
);
export const getMetadata = createSelector(
  getRoot,
  metadata => metadata.metadata
);

// Presentation 3 language map.
const t = value => ({ en: [value] });

const filerP2Id = ({ ...obj }) => {
  obj.id = obj['@id'] || obj.id;
  delete obj['@id'];
  if (obj['@type']) {
    delete obj['@type'];
  }
  return obj;
};

const getId = obj => obj['@id'] || obj.id;

export const presentation3Manifest = (state, props = {}) => {
  const idPrefix =
    props.idPrefix || 'https://digirati.com/narrative-editor/1.0/';

  const currentCanvas = canvasSelector.currentCanvas(state);
  const tileSource = tileSourceSelector.currentTileSource(state);

  return {
    '@context': ['http://iiif.io/api/presentation/3/context.json'],
    id: `${idPrefix}manifest1`,
    type: 'Manifest',
    label: t(getLabel(state)),
    summary: t(getSummary(state)),
    requiredStatement: t(getRequiredStatement(state)),
    metadata: getMetadata(state).map(item => ({
      label: t(item.label),
      value: t(item.value),
    })),
    items: [
      {
        id: idPrefix + getId(currentCanvas),
        type: 'Canvas',
        label: t(canvasSelector.getLabel(state)),
        summary: t(canvasSelector.getSummary(state)),
        requiredStatement: t(canvasSelector.getRequiredStatement(state)),
        metadata: canvasSelector.getMetadata(state).map(item => ({
          label: t(item.label),
          value: t(item.value),
        })),
        height: tileSource.height,
        width: tileSource.width,
        annotations: [
          {
            id: idPrefix + getId(currentCanvas) + '/annoPage2',
            type: 'AnnotationPage',
            items: annotationsSelector.getAnnotations(state),
          },
        ],
        items: [
          {
            id: idPrefix + getId(currentCanvas) + '/annoPage1',
            type: 'AnnotationPage',
            items: [
              filerP2Id({
                id: idPrefix + getId(currentCanvas) + '/anno1',
                body: filerP2Id({
                  ...tileSource,
                  id: getId(tileSource),
                  type: 'Image',
                  service: tileSource.service
                    ? [
                        filerP2Id({
                          ...tileSource.service,
                          id: getId(tileSource.service),
                        }),
                      ]
                    : null,
                }),
                motivation: 'painting',
                type: 'Annotation',
                target: idPrefix + getId(currentCanvas),
              }),
            ],
          },
        ],
      },
    ],
  };
};
