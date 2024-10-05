<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::where('name', 'Admin')->first();

        $admin = User::updateOrCreate([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ],
        [
            'password' => bcrypt('password123'),
        ]);

        if ($adminRole) {
            $admin->assignRole($adminRole);
        }
    }
}
