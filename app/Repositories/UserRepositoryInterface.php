<?php

namespace App\Repositories;

/**
 * Interface UserRepositoryInterface
 *
 * Handles user-related database queries.
 *
 * @package App\Repositories
 */
interface UserRepositoryInterface
{
    public function findByEmail(string $email);
}
