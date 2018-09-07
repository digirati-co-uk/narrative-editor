import React, { Component } from 'react';
import BEM from '@fesk/bem-js';
import './MetadataEditor.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const $b = BEM.block('metadata-editor');
class MetadataEditor extends Component {
  updateLabel = e => this.props.updateLabel(e.target.value);
  updateSummary = e => this.props.updateSummary(e.target.value);
  updateRequiredStatement = e =>
    this.props.updateRequiredStatement(e.target.value);

  updateMetadataPairLabel = index => e =>
    this.props.updateMetadataPair(
      index,
      e.target.value,
      this.props.metadata[index].value
    );

  updateMetadataPairValue = index => e =>
    this.props.updateMetadataPair(
      index,
      this.props.metadata[index].label,
      e.target.value
    );

  addMetadataPair = () => {
    this.props.addMetadataPair('untitled', '');
  };

  removeMetadataPair = index => () => {
    this.props.removeMetadataPair(index);
  };

  onDragEnd = ({ source, destination }) => {
    this.props.reorderMetadataPair(source.index, destination.index);
  };

  render() {
    const { label, summary, metadata, requiredStatement } = this.props;

    return (
      <div className={$b}>
        <div className={$b.element('field')}>
          <label className={$b.element('label')}>Label</label>
          <input
            name="label"
            value={label || ''}
            onChange={this.updateLabel}
            className={$b.element('input')}
            type="text"
          />
        </div>
        <div className={$b.element('field')}>
          <label className={$b.element('label')}>Summary</label>
          <input
            name="summary"
            value={summary || ''}
            onChange={this.updateSummary}
            className={$b.element('input')}
            type="text"
          />
        </div>
        <div className={$b.element('field')}>
          <label className={$b.element('label')}>Required Statement</label>
          <input
            name="requiredStatement"
            value={requiredStatement || ''}
            onChange={this.updateRequiredStatement}
            className={$b.element('input')}
            type="text"
          />
        </div>
        <div className={$b.element('label')}>Metadata pairs</div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                className={$b
                  .element('metadata-pairs')
                  .modifiers({ isDraggingOver: snapshot.isDraggingOver })}
                ref={provided.innerRef}
              >
                {metadata.map((metadataItem, index) => (
                  <Draggable key={index} draggableId={index} index={index}>
                    {(dProvided, dSnapshot) => (
                      <div>
                        <div
                          ref={dProvided.innerRef}
                          {...dProvided.draggableProps}
                          {...dProvided.dragHandleProps}
                          className={$b
                            .element('metadata-pair')
                            .modifiers({ isDragging: dSnapshot.isDragging })}
                          key={index}
                          style={dProvided.draggableProps.style}
                        >
                          <label className={$b.element('label')}>Label</label>
                          <input
                            name={`metadata-pair-label-${index}`}
                            value={metadataItem.label || ''}
                            onChange={this.updateMetadataPairLabel(index)}
                            className={$b.element('input')}
                            type="text"
                          />
                          <label className={$b.element('label')}>Value</label>
                          <input
                            name={`metadata-pair-value-${index}`}
                            value={metadataItem.value || ''}
                            onChange={this.updateMetadataPairValue(index)}
                            className={$b.element('input')}
                            type="text"
                          />
                          <button
                            className={$b.element('remove')}
                            onClick={this.removeMetadataPair(index)}
                          >
                            remove
                          </button>
                        </div>
                        <div>{dProvided.placeholder}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                <button
                  className={$b.element('add-inline')}
                  onClick={this.addMetadataPair}
                >
                  + Add metadata pair
                </button>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default MetadataEditor;
