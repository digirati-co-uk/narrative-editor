import { createSelector } from 'reselect';
import * as canvasSelector from './canvas';
import * as tileSourceSelector from './tileSource';
import * as annotationsSelector from './annotations';

export const getRoot = state => state.metadata;
export const getId = createSelector(getRoot, metadata => metadata.id);
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

const getResourceId = obj => obj['@id'] || obj.id;

export const presentation3Manifest = (state, props = {}) => {
  const currentCanvas = canvasSelector.currentCanvas(state);
  const tileSource = tileSourceSelector.currentTileSource(state);

  const idPrefix = getResourceId(state)
    ? getResourceId(state)
    : props.idPrefix || 'https://digirati.com/narrative-editor/1.0/';

  const tileSourceService = Array.isArray(tileSource.service)
    ? tileSource.service[0]
    : tileSource.service;

  return {
    '@context': ['http://iiif.io/api/presentation/3/context.json'],
    id: idPrefix,
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
        id: getResourceId(currentCanvas),
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
            id: getResourceId(currentCanvas) + '/annoPage2',
            type: 'AnnotationPage',
            items: annotationsSelector.getAnnotations(state),
          },
        ],
        items: [
          {
            id: getResourceId(currentCanvas) + '/annoPage1',
            type: 'AnnotationPage',
            items: [
              filerP2Id({
                id: getResourceId(currentCanvas) + '/anno1',
                body: filerP2Id({
                  ...tileSource,
                  id: getResourceId(tileSource),
                  type: 'Image',
                  service: tileSourceService
                    ? [
                        filerP2Id({
                          ...tileSourceService,
                          id: getResourceId(tileSourceService),
                        }),
                      ]
                    : null,
                }),
                motivation: 'painting',
                type: 'Annotation',
                target: getResourceId(currentCanvas),
              }),
            ],
          },
        ],
      },
    ],
  };
};
