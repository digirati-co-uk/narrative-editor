import React, { Component } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import TextField from '../TextField/TextField';
import BEM from '@fesk/bem-js';
import uuid from 'uuid/v1';
import posed, { PoseGroup } from 'react-pose';
import './MetadataPairs.scss';

const $b = BEM.block('metadata-pairs');
class MetadataPairs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid(),
    };
  }

  onDragEnd = ({ source, destination }) => {
    if (destination) {
      this.props.reorderMetadataPair(source.index, destination.index);
    }
  };

  render() {
    const {
      metadata,
      addMetadataPair,
      updateMetadataPairLabel,
      updateMetadataPairValue,
      removeMetadataPair,
    } = this.props;
    const { id } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <PoseGroup>
          <Droppable key={1} droppableId={id}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={$b.modifiers({
                  isDraggingOver: snapshot.isDraggingOver,
                })}
              >
                {metadata.map((metadataItem, index) => (
                  <Draggable
                    key={metadataItem.id}
                    draggableId={metadataItem.id}
                    index={index}
                  >
                    {(dProvided, dSnapshot) => (
                      <MetadataPairs.Pair
                        {...dProvided.draggableProps}
                        {...dProvided.dragHandleProps}
                        key={metadataItem.id}
                        id={metadataItem.id}
                        index={index}
                        innerRef={dProvided.innerRef}
                        label={metadataItem.label}
                        value={metadataItem.value}
                        isDragging={dSnapshot.isDragging}
                        style={dProvided.draggableProps.style}
                        updateMetadataPairLabel={updateMetadataPairLabel}
                        updateMetadataPairValue={updateMetadataPairValue}
                        removeMetadataPair={removeMetadataPair}
                      />
                    )}
                  </Draggable>
                ))}
                <button
                  className={$b.element('add-inline')}
                  onClick={addMetadataPair}
                >
                  + Add metadata pair
                </button>
              </div>
            )}
          </Droppable>
        </PoseGroup>
      </DragDropContext>
    );
  }
}

MetadataPairs.Form = posed.div({
  enter: {
    opacity: 1,
    delay: 300,
    beforeChildren: true,
  },
  exit: { opacity: 0 },
  editing: {
    height: 'auto',
    flip: true,
  },
  viewing: {
    height: 'auto',
    flip: true,
  },
});

MetadataPairs.Edit = posed.div({
  editing: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 300 },
  },
  viewing: {
    height: 0,
    opacity: 0,
    transition: { duration: 300 },
  },
});
MetadataPairs.View = posed.div({
  editing: {
    height: 0,
    opacity: 0,
    transition: { duration: 300 },
  },
  viewing: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 300 },
  },
});

MetadataPairs.Pair = class extends Component {
  state = { editing: false };

  edit = e => {
    e.preventDefault();
    this.setState(s => ({ editing: true }));
  };
  finishedEditing = () => {
    this.setState(s => ({ editing: false }));
  };

  componentWillMount() {
    if (this.props.value === '') {
      this.setState({ editing: true });
    }
  }

  render() {
    const {
      innerRef,
      placeholder,
      updateMetadataPairLabel,
      updateMetadataPairValue,
      removeMetadataPair,
      id,
      index,
      label,
      value,
      style,
      isDragging,
      ...props
    } = this.props;
    const { editing } = this.state;
    return (
      <MetadataPairs.Form
        onDoubleClick={this.edit}
        pose={editing ? 'editing' : 'viewing'}
      >
        <div
          {...props}
          ref={innerRef}
          className={$b.element('metadata-pair').modifiers({ isDragging })}
          key={id}
          style={style}
        >
          <MetadataPairs.View>
            <div className={$b.element('view-label')}>{label}</div>
            <div className={$b.element('view-value')}>{value}</div>
          </MetadataPairs.View>
          <MetadataPairs.Edit style={{ overflow: 'hidden' }}>
            <TextField
              label="Label"
              name={`metadata-pair-label-${index}`}
              value={label || ''}
              onChange={updateMetadataPairLabel(index)}
            />
            <TextField
              label="Value"
              name={`metadata-pair-value-${index}`}
              value={value || ''}
              textarea={true}
              onChange={updateMetadataPairValue(index)}
            />
            <button
              className={$b.element('remove')}
              onClick={removeMetadataPair(index)}
            >
              remove
            </button>
            <button
              className={$b.element('finish-editing')}
              onClick={this.finishedEditing}
            >
              Finish editing
            </button>
          </MetadataPairs.Edit>
        </div>
        <div>{placeholder}</div>
      </MetadataPairs.Form>
    );
  }
};

export default MetadataPairs;
