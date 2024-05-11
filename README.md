# Patient registration app

## Overview
These are some steps you need to follow in order to run this app, as some solutions for common errors. Remember to add your information 
## Prerequisites
- Docker
- Node.js
- Git

## Setup and Installation
1. Clone the repository

2. Navigate to the project directory:
  cd patient-registration-app

## Backend:
  REMEMBER TO ADD THE .env file

  Navigate to the `backend` directory with 'cd server' and run:
- docker run --rm \\\
    -u "$(id -u):$(id -g)" \\\
    -v "$(pwd):/var/www/html" \\\
    -w /var/www/html \\\
    laravelsail/php81-composer:latest \\\
    composer install --ignore-platform-reqs

    If you can't copy it follow this [link](https://laravel.com/docs/10.x/sail#:~:text=docker%20run%20%2D%2Drm,ignore%2Dplatform%2Dreqs) and copy it from the Laravel's documentation

    If you encounter the message 
    - "/var/www/html/vendor/doctrine does not exist and could not be created"

      You can run:

    - sudo chown -R yourUserName /ROOT_OF_APP && chmod -R 777 /ROOT_OF_APP/vendor

    Create your alias for sail, here is an example:

    - run: alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'

    Now you can run:

    - sail up

    The app uses port 80 and port 3306 for mysql, if you get a message saying those port are in use you can run:

    - service mysql stop
    - service apache2 stop

    Then try to run sail up again

  this is to install composer temporarily and install dependencies, once it's done, run `docker-compose up`, now, in order to migrate and seed the database, run:

- sail php artisan migrate
- sail php artisan storage:link
- sail php artisan queue:work (Remember to add QUEUE_CONNECTION=database to your env file so jobs can be queued and be handled asynchronously)

## Usage
- Visit http://localhost:80 to access the application.

## Usage
- http://localhost:80/api/patients to access patients list, if there are no patients created it should show an empty array.
- http://localhost:80/storage/documents/image-name.jpg to access a patient's document photo.

## Frontend:
  Navigate to the `client` directory with 'cd client'. Use `npm install` to install dependencies and `npm run dev` to start the development server.

## Usage
- Visit http://localhost:3000 to access the application.

## Errors
In case you encounter some of these errors during the local deploy.

### "The stream or file "/var/www/html/storage/logs/laravel.log" could not be opened: failed to open stream: Permission denied"

Close the running service with docker-compose down, then run:
- sudo chmod -R 777 storage
- sudo chmod -R a+rw storage
- php artisan cache:clear
- php artisan config:clear
- php artisan config:cache

And now run it again with docker-compose up.

### "There is no existing directory at /storage/logs and its not buildable: Permission denied"
Just run:
- php artisan cache:clear
- php artisan config:clear
- php artisan config:cache

## Tests
Once you migrated and seeded the database, you should be able to run the tests and pass, for this you have to be in the server folder and run:
- sail php artisan test
