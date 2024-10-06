import React from 'react';
import ProjectActions from './ProjectActions';
import TaskProgress from './TaskProgress';

const ProjectTable = ({
  projects,
  filters,
  handleFilterChange,
  handleSort,
  sortField,
  sortDirection,
  handleOpenTaskModal,
  handleEditProject,
  handleDeleteProject
}) => {
    return (
        <div className="bg-[#18181b] p-4 rounded-[12px]">
            <table className="min-w-full bg-transparent">
                <thead className="rounded-t-[12px]">
                <tr>
                    <th>
                        <input
                            type="text"
                            placeholder="Search by ID"
                            name="id"
                            value={filters.id}
                            onChange={handleFilterChange}
                            className="border-none bg-[#27272a] p-2 rounded-[6px] mb-2 text-white text-sm focus:outline-none placeholder-[rgb(161,161,170)] w-full font-light text-[12px]"
                        />
                    </th>
                    <th>
                        <input
                            type="text"
                            placeholder="Search by Name"
                            name="name"
                            value={filters.name}
                            onChange={handleFilterChange}
                            className="border-none bg-[#27272a] p-2 rounded-[6px] mb-2 text-white text-sm focus:outline-none placeholder-[rgb(161,161,170)] w-full font-light text-[12px]"
                        />
                    </th>
                    <th>
                        <input
                            type="text"
                            placeholder="Search by Description"
                            name="description"
                            value={filters.description}
                            onChange={handleFilterChange}
                            className="border-none bg-[#27272a] p-2 rounded-[6px] mb-2 text-white text-sm focus:outline-none placeholder-[rgb(161,161,170)] w-full font-light text-[12px]"
                        />
                    </th>
                </tr>
                <tr className="bg-[#27272a]">
                    <th className="p-2 text-[rgb(161,161,170)] font-medium text-left cursor-pointer" onClick={() => handleSort('id')}>
                        ID {sortField === 'id' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </th>
                    <th className="p-2 text-[rgb(161,161,170)] font-medium text-left cursor-pointer" onClick={() => handleSort('name')}>
                        Name {sortField === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </th>
                    <th className="p-2 text-[rgb(161,161,170)] font-medium text-left cursor-pointer" onClick={() => handleSort('description')}>
                        Description {sortField === 'description' && (sortDirection === 'asc' ? '▲' : '▼')}
                    </th>
                    <th className="p-2 text-[rgb(161,161,170)] font-medium cursor-pointer">
                        Tasks
                    </th>
                    <th className="p-2 text-[rgb(161,161,170)] text-right font-medium">Actions</th>
                </tr>
                </thead>
                <tbody>
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <tr key={project.id} className="border-b border-gray-700">
                            <td className="p-2 text-[rgb(236,237,238)] text-sm">{project.id}</td>
                            <td className="p-2 text-[rgb(236,237,238)] text-sm">{project.name}</td>
                            <td className="p-2 text-[rgb(236,237,238)] text-sm">{project.description}</td>
                            <td className="p-2 text-[rgb(236,237,238)] text-sm">
                                <TaskProgress doneTasks={project.done_tasks_count} totalTasks={project.tasks_count} />
                            </td>
                            <td className="p-2 text-[rgb(236,237,238)] text-sm">
                                <ProjectActions
                                    project={project}
                                    handleOpenTaskModal={handleOpenTaskModal}
                                    handleEditProject={handleEditProject}
                                    handleDeleteProject={handleDeleteProject}
                                />
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="p-2 text-center text-[rgb(236,237,238)] text-sm">No projects found.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectTable;
