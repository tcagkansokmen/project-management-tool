<?php

namespace Tests\Unit;

use App\Events\ProjectUpdated;
use Illuminate\Support\Facades\Broadcast;
use Tests\TestCase;
use Illuminate\Support\Facades\Event;

class ProjectUpdatedEventTest extends TestCase
{
    /** @test */
    public function it_broadcasts_project_updated_event()
    {
        Event::fake();

        broadcast(new ProjectUpdated('updated'));

        Event::assertDispatched(ProjectUpdated::class, function ($event) {
            return $event->action === 'updated';
        });
    }

    /** @test */
    public function it_broadcasts_project_created_event()
    {
        Event::fake();

        broadcast(new ProjectUpdated('created'));

        Event::assertDispatched(ProjectUpdated::class, function ($event) {
            return $event->action === 'created';
        });
    }

    /** @test */
    public function it_broadcasts_project_deleted_event()
    {
        Event::fake();

        broadcast(new ProjectUpdated('deleted'));

        Event::assertDispatched(ProjectUpdated::class, function ($event) {
            return $event->action === 'deleted';
        });
    }
}
