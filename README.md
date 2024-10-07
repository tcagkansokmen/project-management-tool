# Project Management Tool

This project is a full-featured project management tool built using Laravel and React. It includes functionality for project and task management, sorting, filtering, updating task statuses, and real-time notifications with Pusher integration.

This project implements a **Repository Pattern** for handling database interactions. The **Repository Pattern** is used to separate the logic that interacts with the data layer from the business logic, providing a cleaner, more maintainable codebase. By using repositories, we can easily swap out the data source (for example, switching from MySQL to another database) without affecting the rest of the application.

### Why Repository Pattern?
We chose the **Repository Pattern** over alternatives like the **Service Layer** or **Factory Pattern** for the following reasons:
- **Separation of Concerns**: It provides a clear separation between the business logic and data access logic.
- **Testability**: Since repository interfaces are easily mockable, it simplifies unit testing by allowing you to mock database interactions.
- **Maintainability**: It centralizes data access in a single layer, making the application easier to maintain and extend.
- **Flexibility**: It allows you to easily swap out or extend the data source without needing to rewrite business logic.

While the **Service Layer Pattern** is useful for orchestrating multiple business rules or interacting with multiple repositories, in this case, the Repository Pattern suffices as our application primarily focuses on interactions with a single repository. The **Factory Pattern** is generally more useful for object creation logic, which isn't the primary focus here, as we are managing data rather than object instantiation.

## Features

- **Laravel Backend**: API for managing projects and tasks.
- **React Frontend**: A user-friendly interface for listing, editing, and adding projects and tasks.
- **Pusher Integration**: Real-time updates when projects are updated.
- **Tailwind CSS**: Responsive and modern UI.
- **Task and Project CRUD Operations**: Full Create, Read, Update, and Delete operations with task status management.
- **Modal Forms**: Forms for adding and editing tasks/projects are handled through modals.
- **Pagination and Sorting**: Data listing with pagination and sorting.
- **Supervisor for Queue Handling**: Laravel queue jobs are managed using Supervisor.
- **Task Management**: Assign tasks to projects, change task statuses (To Do, In Progress, Done), edit, and delete tasks.
- **Real-time Updates**: Project updates are broadcasted via **Pusher** for real-time feedback.
- **Spatie Query Builder**: Implemented sorting, filtering, and includable relationships using [Spatie Query Builder](https://github.com/spatie/laravel-query-builder). You can sort, filter, and include related resources in API requests.
- **Role-Permission System**: Example role and permission management using [Spatie Laravel Permission](https://spatie.be/docs/laravel-permission/v5/introduction) package. You can define and assign roles and permissions. An example `RolesAndPermissionsSeeder` is provided to manage roles like Admin, Project Manager, Task Manager, and Task Responsible.
- **Docker Setup**: The project can be run locally or with Docker, which includes auto-installation and setup of all dependencies.
- **Testing**: Comprehensive tests for core functionalities, ensuring robustness.

## Installation

### Requirements
- PHP 8.2+
- Composer
- Node.js & npm
- MySQL

### Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/tcagkansokmen/project-management-tool.git
    cd project-management-tool
    ```

2. **Create the `.env` file:**

   Copy the `.env.example` file and adjust the environment variables, such as database credentials:

    ```bash
    cp .env.example .env
    ```

3. **Create a database:**

   Set up a MySQL database and update the `DB_DATABASE` value in your `.env` file.

4. **Install project dependencies:**

   Run the following commands to install Composer and npm dependencies:

    ```bash
    composer install
    npm install
    ```

5. **Run database migrations & seed:**

   Apply the necessary database migrations:

    ```bash
    php artisan migrate
    php artisan db:seed
    ```

6. **Start the development server:**

   Run the backend and frontend development servers:

    ```bash
    php artisan serve
    npm run dev
    ```

7. **Start the queue worker:**

   To handle background jobs, start the Laravel queue worker:

    ```bash
    php artisan queue:work
    ```

8. **Login**

   You can login to the system with the following credentials:

    ```bash
    admin@example.com
   password123
    ```

### Pusher Integration

Real-time updates are powered by Pusher. Add your Pusher API credentials in the `.env` file:

```bash
PUSHER_APP_ID=your_pusher_app_id
PUSHER_APP_KEY=your_pusher_app_key
PUSHER_APP_SECRET=your_pusher_app_secret
PUSHER_APP_CLUSTER=your_pusher_app_cluster
```

## Docker Setup

Alternatively, you can run the project using Docker for a more streamlined development environment.

### Docker Installation

1. **Ensure Docker and Docker Compose are installed on your system.**

2. **Build and start the Docker containers:**

    ```bash
    docker-compose up --build
    ```

3. **Run migrations and install dependencies inside the container:**

   After the containers are up, run the following commands to install dependencies and migrate the database:

    ```bash
    docker exec -it my_app bash
    composer install
    npm install
    php artisan migrate
    ```

4. **Access the project:**

   Once the containers are running, the project will be available at:

    ```
    http://localhost:8000
    ```

### Queue Handling with Supervisor

Queue workers are automatically managed by Supervisor inside the Docker container. This ensures that Laravel's queue jobs are processed in the background.

To rebuild and start Docker containers (including Supervisor):

```bash
docker-compose up --build
```

Once Docker is running, Supervisor will automatically start processing Laravel queues in the background.
