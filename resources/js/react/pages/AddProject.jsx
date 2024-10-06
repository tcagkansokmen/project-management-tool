import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProject = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/v1/projects', {
                name,
                description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/');
        } catch (error) {
            setError('Failed to add project.');
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-md bg-[#18181b] rounded-lg shadow-lg mt-20 mb-20">
            <h2 className="text-2xl font-semibold text-white mb-6">Add Project</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-white mb-1">Project Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-600 p-2 w-full rounded-[6px] bg-[#27272a] text-white focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-white mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-600 p-2 w-full rounded-[6px] bg-[#27272a] text-white focus:outline-none"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-white text-black rounded-[12px] p-[16px_12px] hover:bg-gray-200 focus:outline-none text-[14px] mb-[15px] font-semibold"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddProject;
