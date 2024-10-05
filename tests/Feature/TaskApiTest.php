<?php

namespace Tests\Feature;

use App\Enums\TaskStatus;
use App\Models\Task;
use App\Models\Project;
use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(RolesAndPermissionsSeeder::class);
        $user = User::factory()->create();
        $user->assignRole('Admin');

        Sanctum::actingAs($user, ['*']);
    }

    /** @test */
    public function it_can_create_a_task()
    {
        $project = Project::factory()->create();
        $data = [
            'project_id' => $project->id,
            'name' => 'Test Task',
            'description' => 'Test Task Description',
            'status' => TaskStatus::TODO->value,
        ];

        $response = $this->postJson('/api/v1/tasks', $data);

        $response->assertCreated()
            ->assertJsonFragment(['name' => 'Test Task']);
        $this->assertDatabaseHas('tasks', $data);
    }

    /** @test */
    public function it_can_get_all_tasks()
    {
        Task::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/tasks');

        $response->assertOk();
        $this->assertCount(3, $response->json('data'));
    }

    /** @test */
    public function it_can_get_a_single_task()
    {
        $task = Task::factory()->create();

        $response = $this->getJson("/api/v1/tasks/{$task->id}");

        $response->assertOk()
            ->assertJsonFragment(['name' => $task->name]);
    }

    /** @test */
    public function it_can_update_a_task()
    {
        $task = Task::factory()->create();

        $data = [
            'name' => 'Updated Task',
            'description' => 'Updated Task Description',
            'status' => TaskStatus::DONE->value,
        ];

        $response = $this->putJson("/api/v1/tasks/{$task->id}", $data);

        $response->assertOk()
            ->assertJsonFragment(['name' => 'Updated Task']);
        $this->assertDatabaseHas('tasks', $data);
    }

    /** @test */
    public function it_can_delete_a_task()
    {
        $task = Task::factory()->create();

        $response = $this->deleteJson("/api/v1/tasks/{$task->id}");

        $response->assertNoContent();

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }
    /** @test */
    public function it_can_filter_tasks_by_status()
    {
        $todoTask = Task::factory()->create(['status' => TaskStatus::TODO]);
        $inProgressTask = Task::factory()->create(['status' => TaskStatus::IN_PROGRESS]);
        $doneTask = Task::factory()->create(['status' => TaskStatus::DONE]);

        $response = $this->getJson('/api/v1/tasks?filter[status]=' . TaskStatus::TODO->value);

        $response->assertOk()
            ->assertJsonFragment(['id' => $todoTask->id])
            ->assertJsonMissing(['id' => $inProgressTask->id])
            ->assertJsonMissing(['id' => $doneTask->id]);
    }
    /** @test */
    public function it_can_sort_tasks_by_name()
    {
        $taskA = Task::factory()->create(['name' => 'Task A']);
        $taskB = Task::factory()->create(['name' => 'Task B']);
        $taskC = Task::factory()->create(['name' => 'Task C']);

        $response = $this->getJson('/api/v1/tasks?sort=name');

        $response->assertOk()
            ->assertSeeInOrder(['Task A', 'Task B', 'Task C']);

        $response = $this->getJson('/api/v1/tasks?sort=-name');

        $response->assertOk()
            ->assertSeeInOrder(['Task C', 'Task B', 'Task A']);
    }

    /** @test */
    public function it_can_include_project_in_tasks()
    {
        $project = Project::factory()->create();
        $task = Task::factory()->create(['project_id' => $project->id]);

        $response = $this->getJson('/api/v1/tasks?include=project');

        $response->assertOk()
            ->assertJsonFragment(['id' => $task->id]);
        $this->assertArrayHasKey('project', $response->json('data')[0]);
        $this->assertEquals($project->name, $response->json('data')[0]['project']['name']);
    }
}
