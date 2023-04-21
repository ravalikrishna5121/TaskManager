import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AddProject from './components/AddProject';
import Kanban from './Kanban';
import TaskPage from './components/TaskPage';
function App() {
  const { user } = useContext(UserContext);

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          {user && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/addproject" element={<AddProject />} />
          
            </>
          )}

          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
            </>
          )}
    <Route path="/taskmanager/:projectId" element={<Kanban />} />
    <Route path="/task/" element={<TaskPage />} />
          <Route path="*" element={<Navigate to={user ? '/' : '/login'} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
