import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null); // State to store selected projectId

  useEffect(() => {
    fetch('http://localhost/react-login-php/php/getProjects.php')
      .then(response => response.json())
      .then(projects => setProjects(projects))
      .catch(err => console.error(err));
  }, []);

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId); // Set selected projectId in state
    console.log(projectId)
  };

  return (
    <div className="block column" style={{ alignItems: 'flex-start' }}>
      <h2>Projects</h2>
      <div className="flex">
        {projects.map(project => (
          <Link to={{
            pathname: `/taskmanager/${project.id}`,
            state: { projectId: project.id } // Pass project.id as state
          }} key={project.id}>
            <div className="project" key={project.id} onClick={() => handleProjectClick(project.id)}>
              <div className="thumb">
                <i className="fa fa-database"></i>
              </div>
              <p>{project.title}</p>
            </div>
          </Link>
        ))}
        {user.name === 'admin' ? (
          <div className="project">
            <div className="thumb dashed" onClick={() => navigate('/addProject')}>
              <i className="fa fa-add"></i>
            </div>
            <p>Add Project</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Projects;
