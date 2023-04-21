import { useState, useEffect, useContext } from "react";
import CardForm from "./CardForm";
import { UserContext } from '../context/UserContext';

function AddCard({ onProjectClick }) {
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const handleShowForm = () => {
    setShowForm(true);
  };

  const [projectId, setProjectId] = useState('');

  const handleProjectClick = (id) => {
    setProjectId(id);
    onProjectClick(id); // Call the callback function with projectId
  };
  useEffect(() => {
    fetch('http://localhost/react-login-php/php/getAll.php')
      .then(response => response.json())
      .then(task => setUsers(task))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      {!showForm && user && user.name === 'admin' && (
        <button className="addcard" onClick={handleShowForm}>Add Task</button>
      )}
      {showForm && (
        <CardForm setShowForm={setShowForm} users={users} />
      )}
    </>
  );
}

export default AddCard;
