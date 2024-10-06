import React, { useState } from 'react';

const EditTaskModal = ({ isOpen, onClose, task, onSubmit }) => {
    const [taskName, setTaskName] = useState(task.name);
    const [taskDescription, setTaskDescription] = useState(task.description);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(task.id, taskName, taskDescription);
        onClose();
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="bg-[#18181b] p-6 rounded-lg shadow-lg relative z-10 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-6 text-white">Edit Task</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white mb-1">Task Name</label>
                        <input
                            className="border border-gray-600 p-2 w-full rounded-[6px] bg-[#27272a] text-white focus:outline-none"
                            type="text"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white mb-1">Task Description</label>
                        <textarea
                            className="border border-gray-600 p-2 w-full rounded-[6px] bg-[#27272a] text-white focus:outline-none"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-500 bg-opacity-10 text-red-500 rounded-[12px] p-[16px_12px] hover:bg-red-200 focus:outline-none text-[14px] mb-[15px] font-semibold"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="bg-white text-black rounded-[12px] p-[16px_12px] hover:bg-gray-200 focus:outline-none text-[14px] mb-[15px] font-semibold"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskModal;
