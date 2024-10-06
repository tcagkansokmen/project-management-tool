import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from '../components/ProjectComponents/TaskList';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import TaskModal from '../components/ProjectComponents/TaskModal';

const ProjectDetail = () => {
    const [project, setProject] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [showTaskModal, setShowTaskModal] = useState(false);

    useEffect(() => {
        fetchProjectDetail();
    }, []);

    const fetchProjectDetail = () => {
        const token = localStorage.getItem('token');
        axios.get(`/api/v1/projects/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setProject(response.data);
            })
            .catch((error) => {
                console.error('Error fetching project details:', error);
            });
    };

    const handleEditProject = () => {
        navigate(`/projects/edit/${id}`);
    };

    const handleOpenTaskModal = () => {
        setShowTaskModal(true);
    };

    const handleAddTask = (taskName, taskDescription) => {
        const token = localStorage.getItem('token');
        axios.post(`/api/v1/tasks`, {
            name: taskName,
            description: taskDescription,
            project_id: id,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                setShowTaskModal(false);
                // Optionally refetch tasks after adding a task
            })
            .catch((error) => {
                console.error('Error adding task:', error);
            });
    };

    return (
        <div className="container mx-auto p-4 max-w-[1280px]">
            {project ? (
                <div className="bg-[#18181b] p-6 rounded-[12px]">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-semibold text-white">{project.name}</h1>
                            <p className="text-lg text-gray-300">{project.description}</p>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleOpenTaskModal}
                                className="text-green-500 bg-green-500 bg-opacity-10 flex items-center rounded-[8px] p-2"
                            >
                                <FaPlus className="mr-2" />
                                Add Task
                            </button>
                            <button
                                onClick={handleEditProject}
                                className="text-blue-500 bg-blue-500 bg-opacity-10 flex items-center rounded-[8px] p-2"
                            >
                                <FaEdit className="mr-2" />
                                Edit Project
                            </button>
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold text-white mb-4">Tasks</h2>
                    <TaskList projectId={project.id} />
                </div>
            ) : (
                <p className="text-white">Loading...</p>
            )}

            {/* Task Modal */}
            {showTaskModal && (
                <TaskModal
                    isOpen={showTaskModal}
                    onClose={() => setShowTaskModal(false)}
                    onSubmit={handleAddTask}
                />
            )}
        </div>
    );
};

export default ProjectDetail;
