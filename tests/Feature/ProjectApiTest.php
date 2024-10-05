<?php
namespace Tests\Feature;

use App\Events\ProjectUpdated;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ProjectApiTest extends TestCase
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
    public function it_can_create_a_project()
    {
        Event::fake();

        $data = [
            'name' => 'Test Project',
            'description' => 'Test Project Description',
        ];

        $response = $this->postJson('/api/v1/projects', $data);

        $response->assertCreated()
            ->assertJsonFragment(['name' => 'Test Project']);
        $this->assertDatabaseHas('projects', $data);

        Event::assertDispatched(ProjectUpdated::class, function ($event) {
            return $event->action === 'created';
        });
    }

    /** @test */
    public function it_can_get_all_projects()
    {
        Project::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/projects');

        $response->assertOk();
        $this->assertCount(3, $response->json('data'));
    }

    /** @test */
    public function it_can_get_a_single_project()
    {
        $project = Project::factory()->create();

        $response = $this->getJson("/api/v1/projects/{$project->id}");

        $response->assertOk()
            ->assertJsonFragment(['name' => $project->name]);
    }

    /** @test */
    public function it_can_update_a_project()
    {
        Event::fake();

        $project = Project::factory()->create();

        $data = [
            'name' => 'Updated Project',
            'description' => 'Updated Project Description',
        ];

        $response = $this->putJson("/api/v1/projects/{$project->id}", $data);

        $response->assertOk()
            ->assertJsonFragment(['name' => 'Updated Project']);
        $this->assertDatabaseHas('projects', $data);

        Event::assertDispatched(ProjectUpdated::class, function ($event) {
            return $event->action === 'updated';
        });
    }

    /** @test */
    public function it_can_delete_a_project()
    {
        Event::fake();

        $project = Project::factory()->create();

        $response = $this->deleteJson("/api/v1/projects/{$project->id}");

        $response->assertNoContent();

        $this->assertDatabaseMissing('projects', ['id' => $project->id]);

        Event::assertDispatched(ProjectUpdated::class, function ($event) {
            return $event->action === 'deleted';
        });
    }

    /** @test */
    public function it_can_filter_projects_by_name()
    {
        $project1 = Project::factory()->create(['name' => 'Test Project A']);
        $project2 = Project::factory()->create(['name' => 'Test Project B']);
        $project3 = Project::factory()->create(['name' => 'Test Project C']);

        $response = $this->getJson('/api/v1/projects?filter[name]=Test Project A');

        $response->assertOk()
            ->assertJsonFragment(['id' => $project1->id, 'name' => 'Test Project A'])
            ->assertJsonMissing(['id' => $project2->id])
            ->assertJsonMissing(['id' => $project3->id]);
    }

    /** @test */
    public function it_can_sort_projects_by_name()
    {
        $projectA = Project::factory()->create(['name' => 'Project A']);
        $projectB = Project::factory()->create(['name' => 'Project B']);
        $projectC = Project::factory()->create(['name' => 'Project C']);

        $response = $this->getJson('/api/v1/projects?sort=name');

        $response->assertOk()
            ->assertSeeInOrder(['Project A', 'Project B', 'Project C']);

        $response = $this->getJson('/api/v1/projects?sort=-name');

        $response->assertOk()
            ->assertSeeInOrder(['Project C', 'Project B', 'Project A']);
    }

    /** @test */
    public function it_can_include_tasks_in_projects()
    {
        $project = Project::factory()->create();
        $task = Task::factory()->create(['project_id' => $project->id]);

        $response = $this->getJson('/api/v1/projects?include=tasks');

        $response->assertOk()
            ->assertJsonFragment(['id' => $project->id, 'name' => $project->name])
            ->assertJsonFragment(['id' => $task->id, 'name' => $task->name]);
    }
}
