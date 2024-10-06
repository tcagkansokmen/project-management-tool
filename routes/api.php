<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\TaskController;
use Illuminate\Support\Facades\Route;


Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/check-token', function () {
    return response()->json(['message' => 'Token is valid'], 200);
});

Route::prefix('v1')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('projects', [ProjectController::class, 'index'])->middleware('permission:list projects');
        Route::post('projects', [ProjectController::class, 'store'])->middleware('permission:create projects');
        Route::get('projects/{project}', [ProjectController::class, 'show'])->middleware('permission:list projects');
        Route::put('projects/{project}', [ProjectController::class, 'update'])->middleware(
            'permission:update projects'
        );
        Route::delete('projects/{project}', [ProjectController::class, 'destroy'])->middleware(
            'permission:delete projects'
        );

        Route::get('tasks', [TaskController::class, 'index'])->middleware('permission:list tasks');
        Route::post('tasks', [TaskController::class, 'store'])->middleware('permission:create tasks');
        Route::get('tasks/{task}', [TaskController::class, 'show'])->middleware('permission:list tasks');
        Route::put('tasks/{task}', [TaskController::class, 'update'])->middleware('permission:update tasks');
        Route::delete('tasks/{task}', [TaskController::class, 'destroy'])->middleware('permission:delete tasks');
    });
});
