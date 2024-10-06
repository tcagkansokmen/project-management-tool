<?php

namespace Tests\Unit;

use App\Events\TaskUpdated;
use App\Models\Project;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class TaskUpdatedEventTest extends TestCase
{
    /** @test */
    public function it_broadcasts_task_updated_event()
    {
        Event::fake();
        $project = Project::factory()->create();

        broadcast(new TaskUpdated($project, 'updated'));

        Event::assertDispatched(TaskUpdated::class, function ($event) {
            return $event->action === 'updated';
        });
    }

    /** @test */
    public function it_broadcasts_task_created_event()
    {
        Event::fake();
        $project = Project::factory()->create();

        broadcast(new TaskUpdated($project, 'created'));

        Event::assertDispatched(TaskUpdated::class, function ($event) {
            return $event->action === 'created';
        });
    }

    /** @test */
    public function it_broadcasts_task_deleted_event()
    {
        Event::fake();
        $project = Project::factory()->create();

        broadcast(new TaskUpdated($project, 'deleted'));

        Event::assertDispatched(TaskUpdated::class, function ($event) {
            return $event->action === 'deleted';
        });
    }
}
