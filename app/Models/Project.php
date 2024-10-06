<?php

namespace App\Models;

use App\Enums\TaskStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Get the tasks for the project.
     *
     * @return HasMany
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    /**
     * Scope a query to get projects with done tasks.
     *
     * @param $query
     * @return mixed
     */
    public function doneTasks()
    {
        return $this->hasMany(Task::class)->where('status', TaskStatus::DONE->value);
    }
}
