<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'list projects',
            'create projects',
            'update projects',
            'delete projects',
            'list tasks',
            'create tasks',
            'update tasks',
            'delete tasks',
        ];

        foreach ($permissions as $permission) {
            Permission::updateOrCreate(['name' => $permission]);
        }

        $admin = Role::updateOrCreate(['name' => 'Admin']);
        $projectManager = Role::updateOrCreate(['name' => 'Project Manager']);
        $taskManager = Role::updateOrCreate(['name' => 'Task Manager']);
        $taskResponsible = Role::updateOrCreate(['name' => 'Task Responsible']);

        $admin->syncPermissions($permissions);

        $projectManager->syncPermissions([
            'list projects',
            'create projects',
            'update projects',
            'list tasks',
            'create tasks',
            'update tasks',
        ]);

        $taskManager->syncPermissions([
            'list tasks',
            'create tasks',
            'update tasks',
        ]);

        $taskResponsible->syncPermissions(['list tasks']);
    }
}
