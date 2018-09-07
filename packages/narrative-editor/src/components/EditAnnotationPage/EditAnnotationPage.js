import React, { Component } from 'react';
import { connect } from 'react-redux';
import AnnotationEditor from '@narrative-editor/annotation-studio-editor';
import { presentation3Manifest } from '@narrative-editor/presley/src/selectors/manifest';

const fakeManifest = {
  '@context': 'http://iiif.io/api/presentation/2/context.json',
  '@id': 'https://view.nls.uk/manifest/7446/74464117/manifest.json',
  '@type': 'sc:Manifest',
  attribution:
    'National Library of Scotland<br/>License: <a target="_top" href="http://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>',
  label: 'Forth Bridge illustrations 1886-1887',
  metadata: [
    {
      label: 'Title',
      value: 'Forth Bridge illustrations 1886-1887',
    },
    {
      label: 'Description',
      value:
        '40 black-and-white photographs capturing the construction of the Forth Bridge by Glasgow-based Sir William Arrol & Co. Close-up and distance views of superstructure, cantilevers, lifting platforms and viaduct. Taken at weekly or fortnightly intervals from 1886-1887 by Philip Phillips, son of one of the contractors. Silver gelatin prints.',
    },
    {
      label: 'Part reference',
      value: '',
    },
    {
      label: 'Shelfmark',
      value: 'RB.l.229',
    },
    {
      label: '',
      value:
        '<a href="http://digital.nls.uk/74464117">View in our digital gallery</a>',
    },
    {
      label: 'Full conditions of use',
      value:
        'You have permission to make copies of this work under the <a target="_top" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International Licence</a> unless otherwise stated.',
    },
  ],
  sequences: [
    {
      '@id': 'https://view.nls.uk/manifest/7446/74464117/canvas/default',
      '@type': 'sc:Sequence',
      canvases: [
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/1',
          '@type': 'sc:Canvas',
          height: 1868,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438561.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/1',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438561.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1868,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438561.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '1',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438561.4.jpg',
            '@type': 'dctypes:Image',
            height: 113,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/2',
          '@type': 'sc:Canvas',
          height: 1869,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438562.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/2',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438562.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1869,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438562.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '2',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438562.4.jpg',
            '@type': 'dctypes:Image',
            height: 113,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/3',
          '@type': 'sc:Canvas',
          height: 1855,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438654.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/3',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438654.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1855,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438654.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '3',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438654.4.jpg',
            '@type': 'dctypes:Image',
            height: 112,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/4',
          '@type': 'sc:Canvas',
          height: 1861,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438655.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/4',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438655.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1861,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438655.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '4',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438655.4.jpg',
            '@type': 'dctypes:Image',
            height: 112,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/5',
          '@type': 'sc:Canvas',
          height: 1887,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438656.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/5',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438656.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1887,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438656.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '5',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438656.4.jpg',
            '@type': 'dctypes:Image',
            height: 114,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/6',
          '@type': 'sc:Canvas',
          height: 1842,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438657.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/6',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438657.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1842,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438657.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '6',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438657.4.jpg',
            '@type': 'dctypes:Image',
            height: 111,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/7',
          '@type': 'sc:Canvas',
          height: 1878,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438658.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/7',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438658.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1878,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438658.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '7',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438658.4.jpg',
            '@type': 'dctypes:Image',
            height: 113,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/8',
          '@type': 'sc:Canvas',
          height: 1936,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438659.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/8',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438659.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1936,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438659.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '8',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438659.4.jpg',
            '@type': 'dctypes:Image',
            height: 117,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/9',
          '@type': 'sc:Canvas',
          height: 1899,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438660.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/9',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438660.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1899,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438660.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '9',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438660.4.jpg',
            '@type': 'dctypes:Image',
            height: 114,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/10',
          '@type': 'sc:Canvas',
          height: 1899,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438661.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/10',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438661.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1899,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438661.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '10',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438661.4.jpg',
            '@type': 'dctypes:Image',
            height: 114,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/11',
          '@type': 'sc:Canvas',
          height: 1882,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438662.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/11',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438662.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1882,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438662.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '11',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438662.4.jpg',
            '@type': 'dctypes:Image',
            height: 113,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/12',
          '@type': 'sc:Canvas',
          height: 1869,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438663.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/12',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438663.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1869,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438663.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '12',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438663.4.jpg',
            '@type': 'dctypes:Image',
            height: 113,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/13',
          '@type': 'sc:Canvas',
          height: 1876,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438664.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/13',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438664.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1876,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438664.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '13',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438664.4.jpg',
            '@type': 'dctypes:Image',
            height: 113,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/14',
          '@type': 'sc:Canvas',
          height: 3315,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438665.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/14',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438665.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 3315,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438665.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '14',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438665.4.jpg',
            '@type': 'dctypes:Image',
            height: 199,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/15',
          '@type': 'sc:Canvas',
          height: 1883,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438666.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/15',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438666.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1883,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438666.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '15',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438666.4.jpg',
            '@type': 'dctypes:Image',
            height: 113,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/16',
          '@type': 'sc:Canvas',
          height: 1866,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438667.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/16',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438667.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1866,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438667.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '16',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438667.4.jpg',
            '@type': 'dctypes:Image',
            height: 112,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/17',
          '@type': 'sc:Canvas',
          height: 1830,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438668.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/17',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438668.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1830,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438668.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '17',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438668.4.jpg',
            '@type': 'dctypes:Image',
            height: 110,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/18',
          '@type': 'sc:Canvas',
          height: 1830,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438669.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/18',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438669.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1830,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438669.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '18',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438669.4.jpg',
            '@type': 'dctypes:Image',
            height: 110,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/19',
          '@type': 'sc:Canvas',
          height: 3293,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438670.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/19',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438670.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 3293,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438670.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '19',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438670.4.jpg',
            '@type': 'dctypes:Image',
            height: 198,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/20',
          '@type': 'sc:Canvas',
          height: 1823,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438671.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/20',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438671.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1823,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438671.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '20',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438671.4.jpg',
            '@type': 'dctypes:Image',
            height: 110,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/21',
          '@type': 'sc:Canvas',
          height: 3312,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438672.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/21',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438672.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 3312,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438672.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '21',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438672.4.jpg',
            '@type': 'dctypes:Image',
            height: 199,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/22',
          '@type': 'sc:Canvas',
          height: 1849,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438673.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/22',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438673.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1849,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438673.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '22',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438673.4.jpg',
            '@type': 'dctypes:Image',
            height: 111,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/23',
          '@type': 'sc:Canvas',
          height: 1857,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438674.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/23',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438674.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1857,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438674.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '23',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438674.4.jpg',
            '@type': 'dctypes:Image',
            height: 112,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/24',
          '@type': 'sc:Canvas',
          height: 3379,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438675.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/24',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438675.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 3379,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438675.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '24',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438675.4.jpg',
            '@type': 'dctypes:Image',
            height: 203,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/25',
          '@type': 'sc:Canvas',
          height: 1843,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438676.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/25',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438676.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1843,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438676.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '25',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438676.4.jpg',
            '@type': 'dctypes:Image',
            height: 111,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/26',
          '@type': 'sc:Canvas',
          height: 1837,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438677.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/26',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438677.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1837,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438677.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '26',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438677.4.jpg',
            '@type': 'dctypes:Image',
            height: 111,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/27',
          '@type': 'sc:Canvas',
          height: 1881,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438678.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/27',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438678.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1881,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438678.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '27',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438678.4.jpg',
            '@type': 'dctypes:Image',
            height: 113,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/28',
          '@type': 'sc:Canvas',
          height: 1830,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438679.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/28',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438679.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1830,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438679.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '28',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438679.4.jpg',
            '@type': 'dctypes:Image',
            height: 110,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/29',
          '@type': 'sc:Canvas',
          height: 1885,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438680.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/29',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438680.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1885,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438680.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '29',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438680.4.jpg',
            '@type': 'dctypes:Image',
            height: 114,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/30',
          '@type': 'sc:Canvas',
          height: 1834,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438681.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/30',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438681.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1834,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438681.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '30',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438681.4.jpg',
            '@type': 'dctypes:Image',
            height: 111,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/31',
          '@type': 'sc:Canvas',
          height: 1845,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438682.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/31',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438682.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1845,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438682.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '31',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438682.4.jpg',
            '@type': 'dctypes:Image',
            height: 111,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/32',
          '@type': 'sc:Canvas',
          height: 1837,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438683.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/32',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438683.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1837,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438683.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '32',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438683.4.jpg',
            '@type': 'dctypes:Image',
            height: 111,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/33',
          '@type': 'sc:Canvas',
          height: 1834,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438684.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/33',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438684.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1834,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438684.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '33',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438684.4.jpg',
            '@type': 'dctypes:Image',
            height: 111,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/34',
          '@type': 'sc:Canvas',
          height: 1867,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438685.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/34',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438685.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1867,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438685.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '34',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438685.4.jpg',
            '@type': 'dctypes:Image',
            height: 113,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/35',
          '@type': 'sc:Canvas',
          height: 1848,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438686.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/35',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438686.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1848,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438686.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '35',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438686.4.jpg',
            '@type': 'dctypes:Image',
            height: 111,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/36',
          '@type': 'sc:Canvas',
          height: 1864,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74438687.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/36',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74438687.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1864,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74438687.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '36',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74438687.4.jpg',
            '@type': 'dctypes:Image',
            height: 112,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/37',
          '@type': 'sc:Canvas',
          height: 1859,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74439048.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/37',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74439048.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1859,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74439048.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '37',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74439048.4.jpg',
            '@type': 'dctypes:Image',
            height: 112,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/38',
          '@type': 'sc:Canvas',
          height: 1838,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74439050.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/38',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74439050.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1838,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74439050.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '38',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74439050.4.jpg',
            '@type': 'dctypes:Image',
            height: 111,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/39',
          '@type': 'sc:Canvas',
          height: 1841,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74439051.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/39',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74439051.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1841,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74439051.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '39',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74439051.4.jpg',
            '@type': 'dctypes:Image',
            height: 111,
            width: 150,
          },
          width: 2500,
        },
        {
          '@id': 'https://view.nls.uk/iiif/7446/74464117/canvas/40',
          '@type': 'sc:Canvas',
          height: 1836,
          images: [
            {
              '@id': 'https://view.nls.uk/iiif/7443/74439052.5/annotation',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              on: 'https://view.nls.uk/iiif/7446/74464117/canvas/40',
              resource: {
                '@id':
                  'https://view.nls.uk/iiif/7443/74439052.5/full/full/0/native.jpg',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                height: 1836,
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'https://view.nls.uk/iiif/7443/74439052.5',
                  profile: 'http://iiif.io/api/image/2/profiles/level2.json',
                },
                width: 2500,
              },
            },
          ],
          label: '40',
          thumbnail: {
            '@id': 'https://deriv.nls.uk/dcn4/7443/74439052.4.jpg',
            '@type': 'dctypes:Image',
            height: 111,
            width: 150,
          },
          width: 2500,
        },
      ],
      label: 'default',
      viewingHint: 'individuals',
    },
  ],
  structures: [
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-1',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/1'],
      label: 'Imaginative depiction of the completed Forth Rail Bridge',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-2',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/2'],
      label:
        'No. 2 - Fife S.W. skewback & tubes in  construction, 7 Sept. 1886',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-3',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/3'],
      label: 'No. 3 - Superstructure, Fife, 15 Sept. 1886',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-4',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/4'],
      label: 'No. 4 - Superstructure, North Side',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-5',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/5'],
      label: 'General views from high ground back of South Queensferry',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-6',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/6'],
      label: 'General views from high ground back of South Queensferry',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-7',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/7'],
      label: 'Fife superstructure from sea shore',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-8',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/8'],
      label:
        'Queensferry superstructure, showing arrangement of lifting platforms',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-9',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/9'],
      label: 'Inchgarvie superstructure, showing erection of skewbacks',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-10',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/10'],
      label: 'Detail of top member joint',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-11',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/11'],
      label: 'Works at Inchgarvie, showing completion of lifting platforms',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-12',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/12'],
      label: 'Queensferry cantilever from end of approach viaduct',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-13',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/13'],
      label: 'Detail of the top member',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-14',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/14'],
      label: 'Queensferry cantilever at rail level',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-15',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/15'],
      label: 'Inchgarvie cantilever as seen from the landing stage',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-16',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/16'],
      label: 'Fife cantilever from the east side',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-17',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/17'],
      label: 'Fife from Village Pier (west side)',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-18',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/18'],
      label: 'Works at Inchgarvie after first three lifts',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-19',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/19'],
      label: 'Queensferry cantilever two thirds full height',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-20',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/20'],
      label: 'Works at Inchgarvie from wind gauge on castle ruins',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-21',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/21'],
      label:
        'Queensferry cantilever at full height from north end of approach viaduct',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-22',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/22'],
      label:
        'Three cantilevers from the south shore on the occasion of Queensferry superstructure attaining its full height',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-23',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/23'],
      label:
        'Three cantilevers from the south shore on the occasion of Queensferry superstructure attaining its full height',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-24',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/24'],
      label: 'Fife cantilever, at full height from village pier',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-25',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/25'],
      label: 'General view from Port Edgar, with trees in the foreground',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-26',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/26'],
      label: 'General view taken from the east end of South Queensferry',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-27',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/27'],
      label: 'General view taken from Dalmeny Park at water level',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-28',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/28'],
      label: 'General view taken late in the evening',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-29',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/29'],
      label: 'Queensferry cantilever and eight spans of approach viaduct',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-30',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/30'],
      label: 'Inchgarvie cantilever, three-fourths full height',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-31',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/31'],
      label:
        'General view from North Queensferry hills depicting the three cantilevers at very nearly their full height',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-32',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/32'],
      label: "Birds'-eye view of Inchgarvie and surrounding country",
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-33',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/33'],
      label:
        'Fife cantilever, showing arrangement of platforms for construction of struts and ties',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-34',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/34'],
      label: 'Queensferry approach viaduct and half span of cantilever',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-35',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/35'],
      label:
        'General view from the high ground situated S.W. of South Queensferry',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-36',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/36'],
      label: 'General view from back of Newhalls Inn, South Queensferry',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-37',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/37'],
      label:
        'Fife cantilever with No. 1 strut and lifting platform nearly up to rail level',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-38',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/38'],
      label: 'Queensferry cantilever from end of Hawes Pier',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-39',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/39'],
      label: 'Inchgarvie superstructure at full height',
    },
    {
      '@id': 'https://view.nls.uk/iiif/7446/74464117/range/r-40',
      '@type': 'sc:Range',
      canvases: ['https://view.nls.uk/iiif/7446/74464117/canvas/40'],
      label:
        'Part of Inchgarvie and Queensferry works, showing the span to be bridged',
    },
  ],
};
const fakeCaptureModel = {
  '@context': {
    bibo: {
      '@id': 'http://purl.org/ontology/bibo/',
      vocabulary_id: '3',
      vocabulary_label: 'Bibliographic Ontology',
    },
    cnt: 'http://www.w3.org/2011/content#',
    crowds: {
      '@id': 'http://www.digirati.com/ns/crowds',
      vocabulary_id: '15',
      vocabulary_label:
        'Crowds: Crowd Source Vocabulary for defining capture models.',
    },
    dcterms: {
      '@id': 'http://purl.org/dc/terms/',
      vocabulary_id: '1',
      vocabulary_label: 'Dublin Core',
    },
    dctype: {
      '@id': 'http://purl.org/dc/dcmitype/',
      vocabulary_id: '2',
      vocabulary_label: 'Dublin Core Type',
    },
    doap: {
      '@id': 'http://usefulinc.com/ns/doap#',
      vocabulary_id: '5',
      vocabulary_label: 'Description of a Project (DOAP) vocabulary',
    },
    exif: {
      '@id': 'http://www.w3.org/2003/12/exif/ns',
      vocabulary_id: '8',
      vocabulary_label: 'Vocabulary to describe an Exif format picture data.',
    },
    foaf: {
      '@id': 'http://xmlns.com/foaf/0.1/',
      vocabulary_id: '4',
      vocabulary_label: 'Friend of a Friend',
    },
    iiif: {
      '@id': 'http://iiif.io/api/image/2#',
      vocabulary_id: '9',
      vocabulary_label: 'IIIF Image API Ontology',
    },
    madoc: {
      '@id': 'http://www.digirati.com/ns/madoc#',
      vocabulary_id: '18',
      vocabulary_label: 'Madoc: crowd source vocab for rendering UI',
    },
    o: 'http://omeka.org/s/vocabs/o#',
    oa: {
      '@id': 'http://www.w3.org/ns/oa#',
      vocabulary_id: '10',
      vocabulary_label: 'Open Annotation (oa prefix until update of Omeka)',
    },
    rdfs: {
      '@id': 'http://www.w3.org/2000/01/rdf-schema',
      vocabulary_id: '17',
      vocabulary_label: 'The RDF Schema vocabulary (RDFS)',
    },
    sc: {
      '@id': 'http://iiif.io/api/presentation/2#',
      vocabulary_id: '12',
      vocabulary_label: 'Shared Canvas',
    },
    schema: {
      '@id': 'http://schema.org/',
      vocabulary_id: '14',
      vocabulary_label: 'Schema.org',
    },
    svcs: {
      '@id': 'http://rdfs.org/sioc/ns#',
      vocabulary_id: '13',
      vocabulary_label: 'SIOC Services Ontology Module',
    },
    time: 'http://www.w3.org/2006/time#',
  },
  '@id':
    'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/item_sets/77',
  '@type': ['o:ItemSet', 'dctype:InteractiveResource'],
  'crowds:derivedAnnoBodyLabelParts': {
    '@id': 'http://xmlns.com/foaf/name',
    'o:label': 'foaf:name',
  },
  'crowds:derivedAnnoCombine': 'True',
  'crowds:derivedAnnoExternalize': 'False',
  'crowds:derivedAnnoHumanReadable': 'False',
  'crowds:derivedAnnoSerialize': 'True',
  'crowds:uiChoice': 'True',
  'crowds:uiGroup': {
    '@id': 'madoc:form',
    'o:label': 'form',
  },
  'crowds:uiMultiple': 'True',
  'dcterms:description': 'Top level model choice for photograph',
  'dcterms:hasPart': [
    {
      '@id':
        'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/item_sets/63',
      '@type': ['o:ItemSet', 'dctype:InteractiveResource'],
      'crowds:derivedAnnoBodyLabelParts': {
        '@id': 'http://xmlns.com/foaf/name',
        'o:label': 'foaf:name',
      },
      'crowds:derivedAnnoCombine': 'True',
      'crowds:derivedAnnoExternalize': 'False',
      'crowds:derivedAnnoHumanReadable': 'False',
      'crowds:derivedAnnoMotivatedBy': {
        '@id': 'oa:tagging',
        'o:label': 'Tagging',
      },
      'crowds:derivedAnnoSerialize': 'True',
      'crowds:uiGroup': {
        '@id': 'madoc:form',
        'o:label': 'Form',
      },
      'crowds:uiMultiple': 'True',
      'crowds:uiSelectorType': 'madoc:boxDraw',
      'dcterms:conformsTo': {
        '@id': 'http://xmlns.com/foaf/spec/#term_Person',
        'o:label': 'Person',
      },
      'dcterms:description': 'A crowd-source group for a person',
      'dcterms:hasPart': [
        {
          '@id':
            'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/items/62',
          '@type': ['o:Item', 'dctype:InteractiveResource'],
          'crowds:derivedAnnoBodyFormat': 'text/plain',
          'crowds:derivedAnnoBodyPurpose': {
            '@id': 'oa:identifying',
            'o:label': 'identifying',
          },
          'crowds:derivedAnnoBodyType': {
            '@id': 'oa:TextualBody',
            'o:label': 'TextualBody',
          },
          'crowds:uiInputType': {
            '@id': 'madoc:textbox',
            'o:label': 'TextBox',
          },
          'dcterms:conformsTo': {
            '@id': 'http://xmlns.com/foaf/name',
            'o:label': 'foaf:name',
          },
          'dcterms:description': 'Name for this person',
          'dcterms:isPartOf': {
            '@id': 'http://nlw-omeka.digtest.co.uk/s/site-one/',
            'o:label': 'GLE Test Site',
          },
          'dcterms:title': 'Name',
          'o:created': {
            '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
            '@value': '2017-03-24T20:02:29+00:00',
          },
          'o:id': 62,
          'o:is_public': true,
          'o:item_set': [],
          'o:media': [],
          'o:modified': {
            '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
            '@value': '2017-03-27T14:17:30+00:00',
          },
          'o:owner': {
            '@id':
              'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/users/3',
            'o:id': 3,
          },
          'o:resource_class': {
            '@id':
              'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/resource_classes/27',
            'o:id': 27,
          },
          'o:resource_template': {
            '@id':
              'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/resource_templates/4',
            'o:id': 4,
          },
          'rdfs:label': 'Name',
          'rdfs:range': {
            '@id': 'rdfs:#literal',
            'o:label': 'Literal',
          },
        },
        {
          '@id':
            'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/items/61',
          '@type': ['o:Item', 'dctype:InteractiveResource'],
          'crowds:derivedAnnoBodyFormat': 'text/plain',
          'crowds:derivedAnnoBodyPurpose': {
            '@id': 'oa:identifying',
            'o:label': 'identifying',
          },
          'crowds:derivedAnnoBodyType': {
            '@id': 'oa:TextualBody',
            'o:label': 'TextualBody',
          },
          'crowds:uiInputType': {
            '@id': 'madoc:datepicker',
            'o:label': 'DatePicker',
          },
          'dcterms:conformsTo': {
            '@id': 'https://schema.org/birthDate',
            'o:label': 'schema:birthDate',
          },
          'dcterms:description': 'Date of Birth of the person identified.',
          'dcterms:isPartOf': {
            '@id': 'http://nlw-omeka.digtest.co.uk/s/site-one/',
            'o:label': 'GLE Test Site',
          },
          'dcterms:title': 'Date of Birth',
          'o:created': {
            '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
            '@value': '2017-03-24T20:00:48+00:00',
          },
          'o:id': 61,
          'o:is_public': true,
          'o:item_set': [],
          'o:media': [],
          'o:modified': {
            '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
            '@value': '2017-03-27T14:20:38+00:00',
          },
          'o:owner': {
            '@id':
              'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/users/3',
            'o:id': 3,
          },
          'o:resource_class': {
            '@id':
              'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/resource_classes/27',
            'o:id': 27,
          },
          'o:resource_template': {
            '@id':
              'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/resource_templates/4',
            'o:id': 4,
          },
          'rdfs:label': 'Date of Birth',
          'rdfs:range': {
            '@id': 'https://schema.org/Date',
            'o:label': 'schema:Date',
          },
        },
        {
          '@id':
            'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/items/60',
          '@type': ['o:Item', 'dctype:InteractiveResource'],
          'crowds:derivedAnnoBodyFormat': 'text/plain',
          'crowds:derivedAnnoBodyPurpose': {
            '@id': 'oa:identifying',
            'o:label': 'identifying',
          },
          'crowds:derivedAnnoBodyType': {
            '@id': 'oa:TextualBody',
            'o:label': 'TextualBody',
          },
          'crowds:uiInputType': {
            '@id': 'madoc:dropdown',
            'o:label': 'Dropdown',
          },
          'crowds:uiInputOptions': ['Baker', 'Butcher', 'Web Developer'],
          'dcterms:conformsTo': {
            '@id': 'https://schema.org/jobTitle',
            'o:label': 'jobTitle',
          },
          'dcterms:description':
            'Job title or occupation for the person identified',
          'dcterms:isPartOf': {
            '@id': 'http://nlw-omeka.digtest.co.uk/s/site-one/',
            'o:label': 'GLE Test Site',
          },
          'dcterms:title': 'Occupation',
          'o:created': {
            '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
            '@value': '2017-03-24T19:59:10+00:00',
          },
          'o:id': 60,
          'o:is_public': true,
          'o:item_set': [],
          'o:media': [],
          'o:modified': {
            '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
            '@value': '2017-03-27T14:22:38+00:00',
          },
          'o:owner': {
            '@id':
              'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/users/3',
            'o:id': 3,
          },
          'o:resource_class': {
            '@id':
              'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/resource_classes/27',
            'o:id': 27,
          },
          'o:resource_template': {
            '@id':
              'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/resource_templates/4',
            'o:id': 4,
          },
          'rdfs:label': 'Occupation',
          'rdfs:range': {
            '@id': 'rdfs:#literal',
            'o:label': 'Literal',
          },
        },
        {
          '@id':
            'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/items/59',
          '@type': ['o:Item', 'dctype:InteractiveResource'],
          'crowds:derivedAnnoBodyFormat': 'text/plain',
          'crowds:derivedAnnoBodyPurpose': {
            '@id': 'oa:describing',
            'o:label': 'describing',
          },
          'crowds:derivedAnnoBodyType': {
            '@id': 'oa:TextualBody',
            'o:label': 'TextualBody',
          },
          'crowds:uiInputType': {
            '@id': 'madoc:textarea',
            'o:label': 'TextArea',
          },
          'dcterms:conformsTo': {
            '@id':
              'http://dublincore.org/documents/dcmi-terms/#terms-description',
            'o:label': 'Description',
          },
          'dcterms:description': 'Description of the person identified',
          'dcterms:isPartOf': {
            '@id': 'http://nlw-omeka.digtest.co.uk/s/site-one/',
            'o:label': 'GLE Test Site',
          },
          'dcterms:title': 'Person Description',
          'o:created': {
            '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
            '@value': '2017-03-24T19:57:15+00:00',
          },
          'o:id': 59,
          'o:is_public': true,
          'o:item_set': [],
          'o:media': [],
          'o:modified': {
            '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
            '@value': '2017-03-27T14:24:26+00:00',
          },
          'o:owner': {
            '@id':
              'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/users/3',
            'o:id': 3,
          },
          'o:resource_class': {
            '@id':
              'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/resource_classes/27',
            'o:id': 27,
          },
          'o:resource_template': {
            '@id':
              'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/resource_templates/4',
            'o:id': 4,
          },
          'rdfs:label': 'Description',
          'rdfs:range': {
            '@id': 'rdfs:#literal',
            'o:label': 'Literal',
          },
        },
      ],
      'dcterms:title': 'Person',
      'o:created': {
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
        '@value': '2017-03-24T20:04:48+00:00',
      },
      'o:id': 63,
      'o:is_open': false,
      'o:is_public': true,
      'o:items': {
        '@id':
          'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/items?item_set_id=63',
      },
      'o:modified': {
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
        '@value': '2017-06-14T23:30:19+00:00',
      },
      'o:owner': {
        '@id':
          'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/users/3',
        'o:id': 3,
      },
      'o:resource_class': {
        '@id':
          'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/resource_classes/27',
        'o:id': 27,
      },
      'o:resource_template': {
        '@id':
          'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/resource_templates/5',
        'o:id': 5,
      },
      'rdfs:label': 'Person',
    },
    {
      '@id':
        'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/item_sets/76',
      '@type': ['o:ItemSet', 'dctype:InteractiveResource'],
      'crowds:derivedAnnoBodyLabelParts': {
        '@id': 'http://xmlns.com/foaf/name',
        'o:label': 'foaf:name',
      },
      'crowds:derivedAnnoCombine': 'True',
      'crowds:derivedAnnoExternalize': 'False',
      'crowds:derivedAnnoHumanReadable': 'False',
      'crowds:derivedAnnoMotivatedBy': {
        '@id': 'oa:describing',
        'o:label': 'describing',
      },
      'crowds:derivedAnnoSerialize': 'True',
      'crowds:uiChoice': 'False',
      'crowds:uiGroup': {
        '@id': 'madoc:form',
        'o:label': 'form',
      },
      'crowds:uiMultiple': 'True',
      'dcterms:conformsTo': {
        '@id': 'https://schema.org/CreativeWork',
        'o:label': 'schema:CreativeWork',
      },
      'dcterms:description': 'Description and data about the whole photo',
      'dcterms:hasPart': [
        {
          '@id':
            'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/items/75',
          '@type': ['o:Item', 'dctype:InteractiveResource'],
          'crowds:derivedAnnoBodyFormat': 'text/plain',
          'crowds:derivedAnnoBodyPurpose': {
            '@id': 'oa:describing',
            'o:label': 'describing',
          },
          'crowds:derivedAnnoBodyType': {
            '@id': 'oa:TextualBody',
            'o:label': 'TextualBody',
          },
          'crowds:uiInputType': {
            '@id': 'madoc:textarea',
            'o:label': 'TextArea',
          },
          'dcterms:conformsTo': {
            '@id':
              'http://dublincore.org/documents/dcmi-terms/#terms-description',
            'o:label': 'dcterms:description',
          },
          'dcterms:description':
            'Personal memory or experience of the events in this photograph',
          'dcterms:isPartOf': {
            '@id': 'http://nlw-omeka.digtest.co.uk/s/site-one/',
            'o:label': 'GLE Test Site',
          },
          'dcterms:title': 'Personal Memory',
          'o:created': {
            '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
            '@value': '2017-04-03T21:32:21+00:00',
          },
          'o:id': 75,
          'o:is_public': true,
          'o:item_set': [],
          'o:media': [],
          'o:owner': {
            '@id':
              'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/users/3',
            'o:id': 3,
          },
          'o:resource_class': {
            '@id':
              'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/resource_classes/27',
            'o:id': 27,
          },
          'o:resource_template': {
            '@id':
              'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/resource_templates/4',
            'o:id': 4,
          },
          'rdfs:label': 'Personal Memory',
          'rdfs:range': {
            '@id': 'rdfs:#literal',
            'o:label': 'rdfs:literal',
          },
        },
        {
          '@id':
            'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/items/74',
          '@type': ['o:Item', 'dctype:InteractiveResource'],
          'crowds:derivedAnnoBodyFormat': 'text/plain',
          'crowds:derivedAnnoBodyPurpose': {
            '@id': 'oa:identifying',
            'o:label': 'identifying',
          },
          'crowds:derivedAnnoBodyType': {
            '@id': 'oa:TextualBody',
            'o:label': 'TextualBody',
          },
          'crowds:uiInputType': {
            '@id': 'madoc:datepicker',
            'o:label': 'DatePicker',
          },
          'dcterms:conformsTo': {
            '@id': 'https://schema.org/dateCreated',
            'o:label': 'schema:dateCreated',
          },
          'dcterms:description': 'Date the photograph was taken',
          'dcterms:isPartOf': {
            '@id': 'http://nlw-omeka.digtest.co.uk/s/site-one/',
            'o:label': 'GLE Test Site',
          },
          'dcterms:title': 'Date Taken',
          'o:created': {
            '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
            '@value': '2017-04-03T21:29:50+00:00',
          },
          'o:id': 74,
          'o:is_public': true,
          'o:item_set': [],
          'o:media': [],
          'o:owner': {
            '@id':
              'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/users/3',
            'o:id': 3,
          },
          'o:resource_class': {
            '@id':
              'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/resource_classes/27',
            'o:id': 27,
          },
          'o:resource_template': {
            '@id':
              'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/resource_templates/4',
            'o:id': 4,
          },
          'rdfs:label': 'Date Taken',
          'rdfs:range': {
            '@id': 'https://schema.org/Date',
            'o:label': 'schema:Date',
          },
        },
      ],
      'dcterms:isPartOf': {
        '@id': 'http://nlw-omeka.digtest.co.uk/s/site-one/',
      },
      'dcterms:title': 'Photo',
      'o:created': {
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
        '@value': '2017-04-03T21:35:51+00:00',
      },
      'o:id': 76,
      'o:is_open': false,
      'o:is_public': true,
      'o:items': {
        '@id':
          'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/items?item_set_id=76',
      },
      'o:owner': {
        '@id':
          'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/users/3',
        'o:id': 3,
      },
      'o:resource_class': {
        '@id':
          'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/resource_classes/27',
        'o:id': 27,
      },
      'o:resource_template': {
        '@id':
          'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/resource_templates/5',
        'o:id': 5,
      },
      'rdfs:label': 'Photo',
    },
  ],
  'dcterms:isPartOf': {
    '@id': 'http://nlw-omeka.digtest.co.uk/s/site-one/',
    'o:label': 'GLE Test Site',
  },
  'dcterms:title': 'Choose',
  'o:created': {
    '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
    '@value': '2017-04-03T21:38:37+00:00',
  },
  'o:id': 77,
  'o:is_open': false,
  'o:is_public': true,
  'o:items': {
    '@id':
      'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/items?item_set_id=77',
  },
  'o:owner': {
    '@id':
      'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/users/3',
    'o:id': 3,
  },
  'o:resource_class': {
    '@id':
      'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/resource_classes/27',
    'o:id': 27,
  },
  'o:resource_template': {
    '@id':
      'http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/resource_templates/5',
    'o:id': 5,
  },
  'rdfs:label': 'Choose',
};

let i = 0;

class EditAnnotationPage extends Component {
  state = { isEditing: false };

  componentWillMount() {
    this.setState({ annotationId: btoa(this.props.annotationId) });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.annotationId !== this.props.annotationId) {
      this.setState({ annotationId: btoa(nextProps.annotationId) });
    }
  }

  render() {
    const { manifestJson } = this.props;
    const { annotationId, isEditing } = this.state;
    return (
      <div>
        {isEditing ? (
          <AnnotationEditor
            manifest={manifestJson.id}
            manifestJson={manifestJson}
            canvas={manifestJson.items[0].id}
            currentCanvas={manifestJson.items[0].id}
            captureModel="http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/item_sets/77"
            captureModelJson={fakeCaptureModel}
            input={{
              ['http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/items/75']:
                'testing this works.',
              ['http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/items/74']: null,
            }}
            onCreateAnnotation={annotation => {
              console.log(annotation);
              this.setState({ isEditing: false });
            }}
            nestedCaptureModelId="http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/item_sets/76"
            captureModelId="http://ec2-54-194-185-179.eu-west-1.compute.amazonaws.com:8100/api/item_sets/77"
          />
        ) : (
          <button onClick={() => this.setState({ isEditing: true })}>
            edit
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  manifestJson: presentation3Manifest(state),
});

export default connect(mapStateToProps)(EditAnnotationPage);
