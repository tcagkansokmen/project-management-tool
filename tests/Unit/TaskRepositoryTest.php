<?php

namespace Tests\Unit;

use App\Models\Task;
use App\Models\Project;
use App\Repositories\TaskRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected TaskRepository $taskRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->taskRepository = new TaskRepository();
    }

    /** @test */
    public function it_can_create_a_task()
    {
        $project = Project::factory()->create();
        $data = [
            'project_id' => $project->id,
            'name' => 'Test Task',
            'description' => 'Test Task Description',
            'status' => 1, // Todo
        ];

        $task = $this->taskRepository->create($data);

        $this->assertInstanceOf(Task::class, $task);
        $this->assertDatabaseHas('tasks', $data);
    }

     /** @test */
    public function it_can_update_a_task()
    {
        $task = Task::factory()->create();
        $data = [
            'name' => 'Updated Task',
            'description' => 'Updated Task Description',
            'status' => 2, // In-progress
        ];

        $updatedTask = $this->taskRepository->update($task->id, $data);

        $this->assertEquals('Updated Task', $updatedTask->name);
        $this->assertDatabaseHas('tasks', $data);
    }

     /** @test */
    public function it_can_delete_a_task()
    {
        $task = Task::factory()->create();

        $foundTask = $this->taskRepository->getById($task->id);

        $this->assertEquals($task->id, $foundTask->id);
    }

     /** @test */
    public function it_can_get_a_task_by_id()
    {
        $task = Task::factory()->create();

        $foundTask = $this->taskRepository->getById($task->id);

        $this->assertEquals($foundTask->id, $task->id);
    }

     /** @test */
    public function it_can_get_all_tasks()
    {
        Task::factory()->count(5)->create();

        $tasks = $this->taskRepository->getAll();

        $this->assertCount(5, $tasks);
    }
}
