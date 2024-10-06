import React from 'react';

const TaskTableHeader = ({ filters, handleFilterChange, handleSort, sortField, sortDirection }) => {
    return (
        <thead className="rounded-t-[12px]">
            {/* Filter Row */}
            <tr>
                <th className="text-left px-1">
                    <input
                        type="text"
                        placeholder="Search by Name"
                        name="name"
                        value={filters.name}
                        onChange={handleFilterChange}
                        className="border-none bg-[#27272a] p-2 rounded-[6px] mb-2 text-white text-sm focus:outline-none placeholder-[rgb(161,161,170)] w-full font-light text-[12px]"
                    />
                </th>
                <th className="text-left">
                    <input
                        type="text"
                        placeholder="Search by Description"
                        name="description"
                        value={filters.description}
                        onChange={handleFilterChange}
                        className="border-none bg-[#27272a] p-2 rounded-[6px] mb-2 text-white text-sm focus:outline-none placeholder-[rgb(161,161,170)] w-full font-light text-[12px]"
                    />
                </th>
                <th className="text-left">
                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        className="h-[36px] appearance-none border-none bg-[#27272a] p-2 rounded-[6px] mb-2 text-white text-sm focus:outline-none placeholder-[rgb(161,161,170)] w-full font-light text-[12px] leading-[1.75]"
                    >
                        <option value="">All</option>
                        <option value="1">To Do</option>
                        <option value="2">In Progress</option>
                        <option value="3">Done</option>
                    </select>
                </th>
                <th className="text-left">
                </th>
                <th></th>
            </tr>

            {/* Sortable Columns */}
            <tr className="bg-[#27272a]">
                <th className="p-2 text-left text-[rgb(161,161,170)] font-medium cursor-pointer" onClick={() => handleSort('name')}>
                    Task Name {sortField === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
                <th className="p-2 text-left text-[rgb(161,161,170)] font-medium cursor-pointer" onClick={() => handleSort('description')}>
                    Description {sortField === 'description' && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
                <th className="p-2 text-left text-[rgb(161,161,170)] font-medium cursor-pointer" onClick={() => handleSort('status')}>
                    Status {sortField === 'status' && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
                <th className="p-2 text-left text-[rgb(161,161,170)] font-medium cursor-pointer" onClick={() => handleSort('created_at')}>
                    Created At {sortField === 'created_at' && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
                <th className="p-2 text-[rgb(161,161,170)] font-medium">Actions</th>
            </tr>
        </thead>
    );
};

export default TaskTableHeader;
