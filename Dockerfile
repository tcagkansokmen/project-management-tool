FROM php:8.1-fpm-alpine

WORKDIR /var/www

RUN apk add --no-cache git curl mysql-client libpng-dev ...

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . /var/www

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

RUN composer install --no-dev --optimize-autoloader

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 9000

ENTRYPOINT ["/entrypoint.sh"]
