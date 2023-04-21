import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
function TaskPage() {
    const [tasks, setTasks] = useState([]);
    const { user } = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost/react-login-php/php/getCard.php')
          .then(response => response.json())
          .then(projects => setTasks(projects))
          .catch(err => console.error(err));
      }, []);

  return (
    <> 
    <div className='taskpage'>
     {tasks.map(item => (
        item.assign == user.email ? (
    <div className='taskinfo'>
    <h6 className='tasktitle'>{item.title}</h6>
    <p className='taskdesc'>{item.description}</p>
    <p className='priority'>{item.priority}</p>
    {/* {user.name === 'admin' && ( 
      <button onClick={handleDelete} className="noselect deletebtn">
        <span className="text">Delete</span>
        <span className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
          </svg>
        </span>
      </button>
    )} */}
  </div>
    ) : null
   ))}
   </div>
    </>
  
  )
}

export default TaskPage