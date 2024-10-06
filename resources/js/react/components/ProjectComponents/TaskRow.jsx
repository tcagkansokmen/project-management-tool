import React, { useState } from 'react';
import { FaEdit, FaTrash, FaArrowRight } from 'react-icons/fa';
import { Tooltip } from '@mui/material';

const TaskRow = ({ task, updateTaskStatus, handleEditTask, handleDeleteTask }) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const confirmDelete = () => {
        setShowDeleteConfirmation(true);
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const deleteTask = () => {
        handleDeleteTask(task);
        setShowDeleteConfirmation(false);
    };

    return (
        <tr key={task.id} className="border-b border-gray-700">
            <td className="p-2 text-[rgb(236,237,238)] text-sm">{task.name}</td>
            <td className="p-2 text-[rgb(236,237,238)] text-sm">{task.description}</td>
            <td className="p-2 text-center">
                <div
                    className={`p-2 rounded-[6px] text-center ${
                        task.status === "To Do"
                            ? 'bg-blue-500 bg-opacity-10 text-blue-500'
                            : task.status === "In Progress"
                                ? 'bg-yellow-500 bg-opacity-10 text-yellow-500'
                                : 'bg-green-500 bg-opacity-10 text-green-500'
                    }`}
                >
                    {task.status}
                </div>
            </td>
            <td className="p-2 text-[rgb(236,237,238)] text-sm">{task.created_at}</td>
            <td className="p-2 text-center">
                <div className="flex justify-end space-x-2">
                    <Tooltip title="Edit Task" arrow>
                        <button onClick={() => handleEditTask(task)} className="text-green-500 bg-green-500 bg-opacity-10 rounded-[8px] p-2">
                            <FaEdit />
                        </button>
                    </Tooltip>
                    <Tooltip title="Delete Task" arrow>
                        <button onClick={confirmDelete} className="text-red-500 bg-red-500 bg-opacity-10 rounded-[8px] p-2">
                            <FaTrash />
                        </button>
                    </Tooltip>

                    {task.status === "To Do" && (
                        <Tooltip title="Move to In Progress" arrow>
                            <button
                                onClick={() => updateTaskStatus(task, '2')}
                                className="text-blue-500 bg-blue-500 bg-opacity-10 rounded-[8px] p-2"
                            >
                                <FaArrowRight />
                            </button>
                        </Tooltip>
                    )}

                    {task.status === "In Progress" && (
                        <Tooltip title="Move to Done" arrow>
                            <button
                                onClick={() => updateTaskStatus(task, '3')}
                                className="text-yellow-500 bg-yellow-500 bg-opacity-10 rounded-[8px] p-2"
                            >
                                <FaArrowRight />
                            </button>
                        </Tooltip>
                    )}
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirmation && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-[#18181b] p-4 rounded-lg shadow-lg max-w-sm w-full">
                            <h2 className="text-white text-lg mb-4">Are you sure you want to delete this task?</h2>
                            <div className="flex justify-end space-x-2">
                                <button onClick={cancelDelete} className="text-white bg-gray-500 px-4 py-2 rounded">
                                    Cancel
                                </button>
                                <button onClick={deleteTask} className="text-white bg-red-500 px-4 py-2 rounded">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default TaskRow;
