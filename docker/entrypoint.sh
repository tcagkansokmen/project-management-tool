#!/bin/sh

echo "Waiting for database connection..."
until nc -z -v -w30 $DB_HOST $DB_PORT; do
   echo "Waiting for MySQL database connection..."
   sleep 5
done

php artisan migrate --force
php artisan db:seed --force

php-fpm
