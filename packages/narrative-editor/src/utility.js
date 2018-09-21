import Converter from 'iiif-prezi2to3';
const p2to3 = new Converter({ deref_links: false });

function presentation2To3(resource) {
  return p2to3.processResource(resource, true);
}

function wrapImageService(imageService) {
  return {
    type: 'Manifest',
    label: { en: ['Untitled Manifest'] },
    items: [
      {
        type: 'Canvas',
        height: imageService.height,
        width: imageService.width,
        items: [
          {
            type: 'AnnotationPage',
            items: [
              {
                type: 'Annotation',
                body: {
                  id: `${imageService['@id']}/full/full/0/default.jpg`,
                  type: 'Image',
                  service: {
                    ...imageService,
                    id: imageService['@id'],
                    profile: imageService.profile[0],
                    protocol: 'http://iiif.io/api/image',
                  },
                  height: imageService.height,
                  width: imageService.width,
                },
                target: '__noId__/canvas',
              },
            ],
          },
        ],
      },
    ],
  };
}

export { presentation2To3, wrapImageService };
