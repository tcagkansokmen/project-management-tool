<?php
namespace App\Repositories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProjectRepository implements ProjectRepositoryInterface
{
    /**
     * Get all projects.
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return Project::all();
    }

    /**
     * Get a project by ID.
     *
     * @param int $id
     * @return Project
     * @throws ModelNotFoundException
     */
    public function getById($id): Project
    {
        return Project::findOrFail($id);
    }

    /**
     * Create a new project.
     *
     * @param array $data
     * @return Project
     */
    public function create(array $data): Project
    {
        return Project::create($data);
    }

    /**
     * Update an existing project.
     *
     * @param int $id
     * @param array $data
     * @return Project
     * @throws ModelNotFoundException
     */
    public function update($id, array $data): Project
    {
        $project = Project::findOrFail($id);
        $project->update($data);
        return $project;
    }

    /**
     * Delete a project by ID.
     *
     * @param int $id
     * @return bool|null
     * @throws ModelNotFoundException
     */
    public function delete($id): ?bool
    {
        $project = Project::findOrFail($id);
        return $project->delete();
    }

    /**
     * Get the model class for QueryBuilder.
     *
     * @return Builder
     */
    public function getModel(): Builder
    {
        return Project::query();
    }
}
