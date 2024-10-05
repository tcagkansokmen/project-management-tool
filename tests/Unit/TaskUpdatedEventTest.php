<?php

namespace Tests\Unit;

use App\Events\TaskUpdated;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class TaskUpdatedEventTest extends TestCase
{
    /** @test */
    public function it_broadcasts_task_updated_event()
    {
        Event::fake();

        broadcast(new TaskUpdated('updated'));

        Event::assertDispatched(TaskUpdated::class, function ($event) {
            return $event->action === 'updated';
        });
    }

    /** @test */
    public function it_broadcasts_task_created_event()
    {
        Event::fake();

        broadcast(new TaskUpdated('created'));

        Event::assertDispatched(TaskUpdated::class, function ($event) {
            return $event->action === 'created';
        });
    }

    /** @test */
    public function it_broadcasts_task_deleted_event()
    {
        Event::fake();

        broadcast(new TaskUpdated('deleted'));

        Event::assertDispatched(TaskUpdated::class, function ($event) {
            return $event->action === 'deleted';
        });
    }
}
