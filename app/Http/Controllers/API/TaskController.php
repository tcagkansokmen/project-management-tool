<?php

namespace App\Http\Controllers\API;

use App\Events\TaskUpdated;
use App\Http\Controllers\Controller;
use App\Repositories\TaskRepositoryInterface;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Http\JsonResponse;
use Spatie\QueryBuilder\QueryBuilder;

class TaskController extends Controller
{
    protected TaskRepositoryInterface $taskRepository;

    /**
     * TaskController constructor.
     *
     * @param TaskRepositoryInterface $taskRepository
     */
    public function __construct(TaskRepositoryInterface $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    /**
     * Display a listing of the tasks.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $tasks = QueryBuilder::for($this->taskRepository->getModel())
            ->allowedIncludes(['project'])
            ->allowedFilters(['name', 'status'])
            ->allowedSorts(['name', 'created_at'])
            ->paginate(10);

        return TaskResource::collection($tasks)->response();
    }

    /**
     * Display the specified task.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $task = $this->taskRepository->getById($id);
        return response()->json(new TaskResource($task));
    }

    /**
     * Store a newly created task in storage.
     *
     * @param StoreTaskRequest $request
     * @return JsonResponse
     */
    public function store(StoreTaskRequest $request): JsonResponse
    {
        $task = $this->taskRepository->create($request->validated());

        broadcast(new TaskUpdated('created'));

        return response()->json(new TaskResource($task), 201);
    }

    /**
     * Update the specified task in storage.
     *
     * @param UpdateTaskRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(UpdateTaskRequest $request, int $id): JsonResponse
    {
        $task = $this->taskRepository->update($id, $request->validated());

        broadcast(new TaskUpdated('updated'));

        return response()->json(new TaskResource($task));
    }

    /**
     * Remove the specified task from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $this->taskRepository->delete($id);

        broadcast(new TaskUpdated('deleted'));

        return response()->json(null, 204);
    }
}
