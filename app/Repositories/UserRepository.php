<?php

namespace App\Repositories;

use App\Models\User;

/**
 * Class UserRepository
 *
 * Implements the user-related database queries.
 *
 * @package App\Repositories
 */
class UserRepository implements UserRepositoryInterface
{
    /**
     * Find a user by their email address.
     *
     * @param string $email
     * @return User|null
     */
    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }
}
