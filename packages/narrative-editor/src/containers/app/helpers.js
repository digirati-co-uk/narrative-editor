const convertDraftToAnnotation = (draft, id, canvasId) => {
  const title =
    draft.input[
      'https://annotation-studio.netlify.com/fields/describing/title'
    ] || '';
  const description =
    draft.input[
      'https://annotation-studio.netlify.com/fields/describing/description'
    ] || '';
  const credit =
    draft.input[
      'https://annotation-studio.netlify.com/fields/describing/credits'
    ] || '';
  const { x, y, width, height } = draft.selector;
  const annotation = {
    id: id,
    type: 'Annotation',
    motivation: 'describing',
    body: {
      type: 'TextualBody',
      value: `<h2 class="annotatedzoom-annotation-detail__label">${title}</h2>
<div class="annotatedzoom-annotation-detail__content">
${description}
<p class="annotatedzoom-annotation-detail__credit">${credit}</p>
</div>`,
      format: 'text/html',
    },
    target: {
      id: `${canvasId}#xywh=${~~x},${~~y},${~~width},${~~height}`,
      type: 'Canvas',
    },
  };
  return annotation;
};

const ANNOTATION_VALUE_REGEXP = /(?:<h2 class="annotatedzoom-annotation-detail__label">([\s\S]*)<\/h2>[^<]*)(?:<div class="annotatedzoom-annotation-detail__content">([\s\S]*?)(?:<p class="annotatedzoom-annotation-detail__credit">([\s\S]*)<\/p>[^<]*)?<\/div>[^<]*)/;

const covertAnnotationToFields = annotation => {
  const targetParts = (typeof annotation.target === 'string'
    ? annotation.target
    : annotation.target.id
  ).split('#');
  const [target, hash] = targetParts;
  const hashParams = hash.split('&').reduce((acc, keyValue) => {
    let [key, value] = keyValue.split('=');
    acc[key] = value;
    return acc;
  }, {});
  let [x, y, width, height] = (hashParams.xywh || '0,0,100,100').split(',');
  let [all, title, description, credit] = annotation.body.value.match(
    ANNOTATION_VALUE_REGEXP
  ) || ['', '', '', ''];
  const draftProps = {
    id: annotation.id,
    target: target,
    input: {
      'https://annotation-studio.netlify.com/fields/describing/title': title,
      'https://annotation-studio.netlify.com/fields/describing/description': description,
      'https://annotation-studio.netlify.com/fields/describing/credits': credit,
    },
    selector: {
      x: ~~x,
      y: ~~y,
      width: ~~width,
      height: ~~height,
    },
  };
  return draftProps;
};

export { convertDraftToAnnotation, covertAnnotationToFields };
