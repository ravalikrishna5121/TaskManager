import React, { useState, useContext, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import AddCard from './components/AddCard';
import TaskCard from './components/TaskCard';
import { UserContext } from './context/UserContext';
import { useParams } from "react-router-dom";

const Kanban = () => {
  const { cards } = useContext(UserContext);
  const {projectId} = useParams();
  const [columns, setColumns] = useState({
    'column-1': {
      title: 'To-do',
      items: [],
    },
    'column-2': {
      title: 'In Progress',
      items: [],
    },
    'column-3': {
      title: 'Done',
      items: [],
    },
  });



  useEffect(() => {
    const newColumns = {
      ...columns,
      'column-1': {
        ...columns['column-1'],
        items: cards,
      },
    };
    setColumns(newColumns);
  }, [cards]);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <>
    <AddCard/>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <div className=''>
          <div className='taskcol'>
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided, snapshot) => (
                    <div
                      className='tasklist'
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <h3 className='titlee'>{column.title}</h3>
                      {Array.isArray(column.items) && column.items.map((item, index) => (
  item.project_id == projectId ? (
    <TaskCard key={item.id} item={item} index={index} />
  ) : null
))}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default Kanban;
