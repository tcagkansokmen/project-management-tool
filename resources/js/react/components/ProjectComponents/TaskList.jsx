import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import TaskTableHeader from './TaskTableHeader';
import TaskRow from './TaskRow';
import EditTaskModal from "./EditTaskModal.jsx";
import Pusher from 'pusher-js';

const TaskList = ({ projectId }) => {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [filters, setFilters] = useState({ name: '', description: '', status: '' });

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleEditTask = (task) => {
        setSelectedTask(task);
        setShowEditModal(true);
    };

    const fetchTasks = (page, field, direction, taskFilters) => {
        const token = localStorage.getItem('token');
        axios.get('/api/v1/tasks', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                page: page,
                'filter[project_id]': projectId,
                'filter[name]': filters?.name ?? filters.name,
                'filter[description]': taskFilters?.description ?? filters.description,
                'filter[status]': taskFilters?.status ?? filters.status,
                sort: field ? `${direction === 'asc' ? '' : '-'}${field}` : '',
            }
        })
            .then((response) => {
                setTasks(response.data.data);
                setCurrentPage(response.data.meta.current_page);
                setLastPage(response.data.meta.last_page);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    };

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

    const updateTaskStatus = (task, newStatus) => {
        const token = localStorage.getItem('token');
        axios.put(`/api/v1/tasks/${task.id}`, { status: newStatus }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(() => {
                fetchTasks(currentPage, sortField, sortDirection, filters);
            })
            .catch(error => console.error('Error updating task status:', error));
    };

    const submitEditTask = (taskId, name, description) => {
        const token = localStorage.getItem('token');
        axios.put(`/api/v1/tasks/${taskId}`, {
            name: name,
            description: description,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                fetchTasks(currentPage);
            })
            .catch((error) => {
                console.error('Error updating task:', error);
            });
    };

    const handleDeleteTask = (task) => {
        const token = localStorage.getItem('token');
        axios.delete(`/api/v1/tasks/${task.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(() => {
                fetchTasks(currentPage, sortField, sortDirection, filters);
            })
            .catch(error => console.error('Error deleting task:', error));
    };

    useEffect(() => {
        fetchTasks(currentPage, sortField, sortDirection, filters);

        const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            encrypted: true,
        });

        const channel = pusher.subscribe('tasks');
        channel.bind('task-updated.' + projectId, () => {
            fetchTasks(currentPage, sortField, sortDirection, filters);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [currentPage, sortField, sortDirection, filters]);

    return (
        <div className="bg-[#18181b] p-4 rounded-[12px]">
            <table className="min-w-full bg-transparent">
                <TaskTableHeader
                    filters={filters}
                    handleFilterChange={handleFilterChange}
                    handleSort={handleSort}
                    sortField={sortField}
                    sortDirection={sortDirection}
                />
                <tbody>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskRow
                            key={task.id}
                            task={task}
                            updateTaskStatus={updateTaskStatus}
                            handleEditTask={handleEditTask}
                            handleDeleteTask={handleDeleteTask}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="p-2 text-center text-[rgb(236,237,238)] text-sm">No tasks found.</td>
                    </tr>
                )}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                handlePreviousPage={() => setCurrentPage(currentPage - 1)}
                handleNextPage={() => setCurrentPage(currentPage + 1)}
            />

            {selectedTask && (
                <EditTaskModal
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    task={selectedTask}
                    onSubmit={submitEditTask}
                />
            )}
        </div>
    );
};

export default TaskList;
