<?php
namespace App\Repositories;

use App\Models\Task;
use App\Enums\TaskStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TaskRepository implements TaskRepositoryInterface
{
    /**
     * Get all tasks.
     *
     * @return Collection|Task[]
     */
    public function getAll(): Collection|array
    {
        return Task::all();
    }

    /**
     * Get a task by ID.
     *
     * @param int $id
     * @return Task
     * @throws ModelNotFoundException
     */
    public function getById($id): Task
    {
        return Task::findOrFail($id);
    }

    /**
     * Create a new task.
     *
     * @param array $data
     * @return Task
     */
    public function create(array $data): Task
    {
        if(!isset($data['status'])) {
            $data['status'] = TaskStatus::TODO->value;
        }
        return Task::create($data);
    }

    /**
     * Update an existing task.
     *
     * @param int $id
     * @param array $data
     * @return Task
     * @throws ModelNotFoundException
     */
    public function update($id, array $data): Task
    {
        $task = Task::findOrFail($id);
        $task->update($data);
        return $task;
    }

    /**
     * Delete a task by ID.
     *
     * @param int $id
     * @return bool|null
     * @throws ModelNotFoundException
     */
    public function delete($id): ?bool
    {
        $task = Task::findOrFail($id);
        return $task->delete();
    }

    /**
     * Get the model class for QueryBuilder.
     *
     * @return Builder
     */
    public function getModel(): Builder
    {
        return Task::query();
    }
}
