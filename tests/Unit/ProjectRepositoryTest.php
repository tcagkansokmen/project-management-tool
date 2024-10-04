<?php
namespace Tests\Unit;

use App\Models\Project;
use App\Repositories\ProjectRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Tests\TestCase;

class ProjectRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected ProjectRepository $projectRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->projectRepository = new ProjectRepository();
    }

    /** @test */
    public function it_can_create_a_project()
    {
        $data = [
            'name' => 'Test Project',
            'description' => 'Test Project Description',
        ];

        $project = $this->projectRepository->create($data);

        $this->assertInstanceOf(Project::class, $project);
        $this->assertDatabaseHas('projects', $data);
    }

    /** @test */
    public function it_can_update_a_project()
    {
        $project = Project::factory()->create();
        $data = [
            'name' => 'Updated Project',
            'description' => 'Updated Project Description',
        ];

        $updatedProject = $this->projectRepository->update($project->id, $data);

        $this->assertEquals('Updated Project', $updatedProject->name);
        $this->assertDatabaseHas('projects', $data);
    }

    /** @test */
    public function it_can_delete_a_project()
    {
        $project = Project::factory()->create();

        $foundProject = $this->projectRepository->getById($project->id);

        $this->assertEquals($project->id, $foundProject->id);
    }

    /** @test */
    public function it_can_get_a_project_by_id()
    {
        $project = Project::factory()->create();

        $foundProject = $this->projectRepository->getById($project->id);

        $this->assertEquals($foundProject->id, $project->id);
    }

    /** @test */
    public function it_can_get_all_projects()
    {
        Project::factory()->count(5)->create();

        $projects = $this->projectRepository->getAll();

        $this->assertCount(5, $projects);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
