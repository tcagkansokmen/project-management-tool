<?php

namespace App\Http\Controllers\API;

use App\Events\ProjectUpdated;
use App\Http\Controllers\Controller;
use App\Repositories\ProjectRepositoryInterface;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    protected ProjectRepositoryInterface $projectRepository;

    /**
     * ProjectController constructor.
     *
     * @param ProjectRepositoryInterface $projectRepository
     */
    public function __construct(ProjectRepositoryInterface $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

    /**
     * Display a listing of the projects.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $projects = QueryBuilder::for($this->projectRepository->getModel())
            ->allowedIncludes(['tasks', 'doneTasks'])
            ->allowedFilters([
                AllowedFilter::exact('id'),
                'name',
                'description',
            ])
            ->allowedSorts(['id', 'name', 'description', 'created_at'])
            ->paginate(10);

        return ProjectResource::collection($projects)->response();
    }

    /**
     * Display the specified project.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $project = $this->projectRepository->getById($id)->load(['tasks']);

        return response()->json(new ProjectResource($project));
    }

    /**
     * Store a newly created project in storage.
     *
     * @param StoreProjectRequest $request
     * @return JsonResponse
     */
    public function store(StoreProjectRequest $request): JsonResponse
    {
        $project = $this->projectRepository->create($request->validated());

        broadcast(new ProjectUpdated('created'));

        return response()->json(new ProjectResource($project), 201);
    }

    /**
     * Update the specified project in storage.
     *
     * @param UpdateProjectRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(UpdateProjectRequest $request, int $id): JsonResponse
    {
        $project = $this->projectRepository->update($id, $request->validated());

        broadcast(new ProjectUpdated('updated'));

        return response()->json(new ProjectResource($project));
    }

    /**
     * Remove the specified project from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $this->projectRepository->delete($id);

        broadcast(new ProjectUpdated('deleted'));

        return response()->json(null, 204);
    }
}
