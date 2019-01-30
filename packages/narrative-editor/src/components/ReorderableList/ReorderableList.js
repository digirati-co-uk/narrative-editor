import React, { Component } from 'react';
import uuid from 'uuid/v1';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { PoseGroup } from 'react-pose';

class ReorderableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid(),
    };
  }

  onDragEnd = ({ source, destination }) => {
    const { updateOrder } = this.props;
    if (updateOrder && destination) {
      updateOrder(source.index, destination.index);
    }
  };

  static defaultProps = {
    renderEmptyState: () => null,
    renderAddNew: () => null,
    isDragDisabled: false,
  };

  render() {
    const { id } = this.state;
    const {
      items,
      className,
      renderEmptyState,
      renderAddNew,
      isDragDisabled,
    } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <PoseGroup>
          <Droppable key={id} droppableId={id} isDropDisabled={isDragDisabled}>
            {(provided, snapshot) => (
              <div className={className} ref={provided.innerRef}>
                {items.length === 0 ? (
                  renderEmptyState()
                ) : (
                  <div>
                    {items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        isDragDisabled={isDragDisabled}
                      >
                        {(dProvided, dSnapshot) =>
                          this.props.children(
                            item,
                            {
                              ...dProvided.draggableProps,
                              ...dProvided.dragHandleProps,
                              key: item.id,
                              ref: dProvided.innerRef,
                            },
                            {
                              index,
                              ...snapshot,
                              ...dSnapshot,
                            }
                          )
                        }
                      </Draggable>
                    ))}
                  </div>
                )}
                {renderAddNew(items)}
              </div>
            )}
          </Droppable>
        </PoseGroup>
      </DragDropContext>
    );
  }
}

export default ReorderableList;
