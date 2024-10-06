import React, { useState } from 'react';
import { Tooltip } from '@mui/material';
import { FaTasks, FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProjectActions = ({ project, handleOpenTaskModal, handleDeleteProject }) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const navigate = useNavigate();

    const confirmDelete = () => {
        setShowDeleteConfirmation(true);
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const deleteProject = () => {
        handleDeleteProject(project);
        setShowDeleteConfirmation(false);
    };

    const handleDetailProject = () => {
        navigate(`/projects/${project.id}`); // Project detail page navigation
    };

    return (
        <div className="flex justify-end space-x-2">
            <Tooltip title="Add Task" arrow>
                <button onClick={() => handleOpenTaskModal(project)} className="text-blue-500 bg-blue-500 bg-opacity-10 rounded-[8px] p-2">
                    <FaTasks />
                </button>
            </Tooltip>
            <Tooltip title="Project Details" arrow>
                <button onClick={handleDetailProject} className="text-green-500 bg-green-500 bg-opacity-10 rounded-[8px] p-2">
                    <FaInfoCircle />
                </button>
            </Tooltip>
            <Tooltip title="Delete Project" arrow>
                <button onClick={confirmDelete} className="text-red-500 bg-red-500 bg-opacity-10 rounded-[8px] p-2">
                    <FaTrash />
                </button>
            </Tooltip>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-[#18181b] p-4 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-white text-lg mb-4">Are you sure you want to delete this project?</h2>
                        <div className="flex justify-end space-x-2">
                            <button onClick={cancelDelete} className="text-white bg-gray-500 px-4 py-2 rounded">
                                Cancel
                            </button>
                            <button onClick={deleteProject} className="text-white bg-red-500 px-4 py-2 rounded">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectActions;
