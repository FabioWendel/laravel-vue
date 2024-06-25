#!/bin/sh

# Aguarde o MySQL iniciar
sleep 10

# Execute as migrations e os seeders
php artisan migrate --force
php artisan db:seed --force

# Inicie o Apache
exec "$@"
