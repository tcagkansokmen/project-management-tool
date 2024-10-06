import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectTable from '../components/ProjectComponents/ProjectTable';
import Pagination from '../components/ProjectComponents/Pagination';
import AddTaskModal from '../components/ProjectComponents/TaskModal';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Pusher from 'pusher-js';

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [sortField, setSortField] = useState('id');
    const [sortDirection, setSortDirection] = useState('asc');
    const [filters, setFilters] = useState({ id: '', name: '', description: '' });
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const navigate = useNavigate();

    const fetchProjects = (page, field, direction, filters) => {
        const token = localStorage.getItem('token');
        axios.get('/api/v1/projects', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                page: page,
                include: 'tasksCount,doneTasksCount',
                sort: field ? `${direction === 'asc' ? '' : '-'}${field}` : '',
                'filter[id]': filters.id,
                'filter[name]': filters.name,
                'filter[description]': filters.description,
            },
        })
            .then((response) => {
                setProjects(response.data.data);
                setCurrentPage(response.data.meta.current_page);
                setLastPage(response.data.meta.last_page);
            })
            .catch((error) => {
                console.error('Error fetching projects:', error);
            });
    };

    useEffect(() => {
        fetchProjects(currentPage, sortField, sortDirection, filters);

        const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            encrypted: true,
        });

        const channel = pusher.subscribe('projects');
        channel.bind('project-updated', () => {
            fetchProjects(currentPage, sortField, sortDirection, filters);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [currentPage, sortField, sortDirection, filters]);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < lastPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleOpenTaskModal = (project) => {
        setSelectedProject(project);
        setShowTaskModal(true);
    };

    const submitTask = (name, description) => {
        const token = localStorage.getItem('token');
        axios.post(`/api/v1/tasks`, {
            name: name,
            description: description,
            project_id: selectedProject.id,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                //
            })
            .catch((error) => {
                console.error('Error creating task:', error);
            });
    };

    const handleDeleteProject = (project) => {
        const token = localStorage.getItem('token');
        axios.delete(`/api/v1/projects/${project.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                //
            })
            .catch((error) => {
                console.error('Error deleting project:', error);
            });
    };

    const handleNewProject = () => {
        navigate('/projects/add');
    };

    return (
        <div className="container mx-auto p-4 max-w-[1280px]">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-white">Projects</h1>
                <button
                    onClick={handleNewProject}
                    className="flex items-center bg-blue-500 bg-opacity-10 text-blue-500 p-2 rounded-[8px]"
                >
                    <FaPlus className="mr-2" />
                    New Project
                </button>
            </div>
            <ProjectTable
                projects={projects}
                filters={filters}
                handleFilterChange={handleFilterChange}
                handleSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection}
                handleOpenTaskModal={handleOpenTaskModal}
                handleDeleteProject={handleDeleteProject}
            />
            <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
            />
            {showTaskModal && (
                <AddTaskModal
                    isOpen={showTaskModal}
                    onSubmit={submitTask}
                    onClose={() => setShowTaskModal(false)}
                />
            )}
        </div>
    );
};

export default Home;
