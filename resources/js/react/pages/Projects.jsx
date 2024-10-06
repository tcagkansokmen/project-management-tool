import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('/api/projects')
            .then(response => setProjects(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Projects</h1>
            <ul>
                {projects.map(project => (
                    <li key={project.id}>
                        <Link to={`/projects/${project.id}`}>{project.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Projects;
