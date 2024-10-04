<?php

namespace App\Enums;

enum TaskStatus: int
{
    case TODO = 1;
    case IN_PROGRESS = 2;
    case DONE = 3;

    /**
     * Get the display name of the status.
     *
     * @return string
     */
    public function label(): string
    {
        return match($this) {
            TaskStatus::TODO => 'To Do',
            TaskStatus::IN_PROGRESS => 'In Progress',
            TaskStatus::DONE => 'Done',
        };
    }

    /**
     * Get the status from an integer value.
     *
     * @param int $value
     * @return TaskStatus
     */
    public static function fromValue(int $value): TaskStatus
    {
        return match($value) {
            1 => TaskStatus::TODO,
            2 => TaskStatus::IN_PROGRESS,
            3 => TaskStatus::DONE,
            default => throw new \InvalidArgumentException('Invalid status value'),
        };
    }
}
