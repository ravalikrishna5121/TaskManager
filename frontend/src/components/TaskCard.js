import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { UserContext } from '../context/UserContext';

const TaskCard = ({ item, index }) => {
  const { deleteCard } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const handleDelete = async () => {
    const { success, message } = await deleteCard(item.id);
    if (success) {
      console.log('Card deleted successfully!');
      window.location.reload();
    } else {
      window.location.reload();
      console.log('Error deleting card: ', message);
    }
  };

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div className='taskinfo'>
          <h6 className='tasktitle'>{item.title}</h6>
          <p className='taskdesc'> Assigned User: {item.assign}</p>
          <p className='taskdesc'>{item.description}</p>
          <p className='priority'>{item.priority}</p>
          {user.name === 'admin' && ( // Condition for rendering delete button
            <button onClick={handleDelete} className="noselect deletebtn">
              <span className="text">Delete</span>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    )}
  </Draggable>
  
  );
};

export default TaskCard;
