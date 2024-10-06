import React from 'react';

const TaskProgress = ({ doneTasks, totalTasks }) => {
    const taskCompletionRatio = totalTasks > 0 ? (doneTasks / totalTasks) : 0;
    let bgColor = '';
    let textColor = '';

    if (taskCompletionRatio === 1) {
        bgColor = 'bg-green-500 bg-opacity-10';
        textColor = 'text-green-500';
    } else if (taskCompletionRatio < 0.5) {
        bgColor = 'bg-red-500 bg-opacity-10';
        textColor = 'text-red-500';
    } else {
        bgColor = 'bg-yellow-500 bg-opacity-10';
        textColor = 'text-yellow-500';
    }

    return (
        <div className={`p-2 rounded-[6px] text-center ${bgColor} ${textColor}`}>
            {doneTasks} / {totalTasks}
        </div>
    );
};

export default TaskProgress;
