import React from 'react';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';

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
  }

  getItemStyle = (isDragging, draggableStyle, isSelected) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: `${grid / 2}px ${grid}px`,
    margin: `0 0 ${grid}px 0`,
    display: 'block',
    position: 'relative',
    // change background colour if dragging
    background: isDragging ? 'rgb(89, 191, 236)' : 'white',
    outline: isSelected ? '2px solid rgb(89, 191, 236)' : '0',
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'white' : 'white',
    padding: grid,
    width: `calc(20vw - ${grid * 2}px)`,
    minHeight: '100%',
  });

  selectItem = annotation => {
    let self = this;
    return () => {
      self.onSelectCallback(annotation);
    };
  };

  selectedItem = () => {
    return this.props.selectedAnnotation
      ? this.props.selectedAnnotation.id
      : null;
  };

  deleteItem = annotation => {
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
      console.log('no dest');
      return;
    }

    if (
      result.source.droppableId === 'annotationlist' &&
      result.destination.droppableId === 'annotationlist'
    ) {
      console.log('anno list to anno list');
      this.props.annotationList.items = reorder(
        this.props.annotationList.items,
        result.source.index,
        result.destination.index
      );
      this.forceUpdate();
    }
  };

  render() {
    let items = this.props.annotationList.items;
    const self = this;
    return (
      <div className="annotation-list">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable key="annotationListDroppable" droppableId="annotationlist">
            {(droppableProvided, droppableSnapshot) => (
              <div
                ref={droppableProvided.innerRef}
                style={self.getListStyle(droppableSnapshot.isDraggingOver)}
              >
                {droppableProvided.placeholder}
                {items.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
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
                            self.selectedItem() === item.id
                          )}
                          className="deletable"
                          onClick={self.selectItem(item)}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.body.value,
                            }}
                          />
                          <button
                            className="fa fa-times-circle"
                            onClick={self.deleteItem(item)}
                          >
                            edit
                          </button>
                          <button
                            className="fa fa-times-circle"
                            onClick={self.deleteItem(item)}
                          >
                            delete
                          </button>
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
