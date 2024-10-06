<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
            'tasks' => TaskResource::collection($this->whenLoaded('tasks')),
            'done_tasks' => TaskResource::collection($this->whenLoaded('done_tasks')),
            'tasks_count' => $this->tasks_count,
            'done_tasks_count' => $this->done_tasks_count,
        ];
    }
}
