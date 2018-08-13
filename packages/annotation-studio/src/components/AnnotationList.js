import React from 'react';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';

import './AnnotationList.scss';

const emptyFn = () => {};
const grid = 8;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export class AnnotationList extends React.Component {
  constructor(props) {
    super(props);
    // TODO: use dispatch instead
    this.onSelectCallback = this.props.onSelectCallback || emptyFn;
    this.onDeleteCallback = this.props.onDeleteCallback || emptyFn;
    this.onDeleteCallback = this.props.onDeleteCallback || emptyFn;
    this.onStartEditingCallback = this.props.onStartEditingCallback || emptyFn;
  }

  getItemStyle = (isDragging, draggableStyle, isSelected) => ({
    // change background colour if dragging
    background: isDragging ? 'rgb(89, 191, 236)' : 'white',
    outline: isSelected ? '2px solid rgb(89, 191, 236)' : '0',
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'white' : 'white',
  });

  selectedAnnotation = () => {
    return this.props.selectedAnnotation
      ? this.props.selectedAnnotation.id
      : null;
  };

  select = annotation => {
    let self = this;
    return () => {
      self.onSelectCallback(annotation);
    };
  };

  edit = annotation => {
    let self = this;
    return () => {
      self.onStartEditingCallback(annotation);
    };
  };

  delete = annotation => {
    let self = this;
    return ev => {
      ev.stopPropagation();

      let foundAt = self.props.annotationList.items
        .map(x => x.id)
        .indexOf(annotation.id);
      if (foundAt !== -1) {
        if (self.onDeleteCallback) {
          self.onDeleteCallback(annotation, foundAt);
        }
        // else {
        // TODO: we don't wan't this.
        // self.props.annotationList.items.splice(foundAt, 1);
        //self.forceUpdate();
        // }
      }
    };
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    if (
      result.source.droppableId === 'annotationlist' &&
      result.destination.droppableId === 'annotationlist' &&
      this.props.onUpdateAnnotationOrder
    ) {
      this.props.onUpdateAnnotationOrder(
        reorder(
          JSON.parse(JSON.stringify(this.props.annotationList.items)),
          result.source.index,
          result.destination.index
        )
      );
    }
  };

  render() {
    let items = this.props.annotationList.items;
    const self = this;
    // NOTE: unfortunately fesk react-bem cannot be used because it creates wrappers which
    // doesn't work together with the drag and drop.
    return (
      <div className="annotation-list">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable key="annotationListDroppable" droppableId="annotationlist">
            {(droppableProvided, droppableSnapshot) => (
              <div
                ref={droppableProvided.innerRef}
                style={self.getListStyle(droppableSnapshot.isDraggingOver)}
                className="annotation-list__dropzone"
              >
                {droppableProvided.placeholder}
                {items.map((annotation, index) => {
                  return (
                    <Draggable
                      key={annotation.id}
                      draggableId={annotation.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={self.getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                            self.selectedAnnotation() === annotation.id
                          )}
                          className="annotation-list__item"
                          onClick={self.select(annotation)}
                        >
                          <div
                            style={{
                              display:
                                self.selectedAnnotation() === annotation.id
                                  ? ''
                                  : 'none',
                            }}
                            className="annotation-list__item-actions"
                          >
                            <button onClick={self.edit(annotation)}>
                              edit
                            </button>
                            <button onClick={self.delete(annotation)}>
                              delete
                            </button>
                          </div>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: this.props.previewRenderer
                                ? this.props.previewRenderer(annotation)
                                : annotation.body.value,
                            }}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}
