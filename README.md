# Installing

- Running with docker-compose:

  ```sh
      docker-compose up
  ```

- Connect with database (PostgreSQL)

  - Host: localhost
  - Database: todo-list
  - UserName: user
  - Password: pass
  - Port: 35432

- Migration with Knex ORM:

  - Create a file migrate:

    ```sh
        docker-compose exec app knex migrate:make $name_file
    ```

  - Exec:

    ```sh
       docker-compose exec app knex migrate:latest
    ```

  - Rollback:
    ```sh
        docker-compose exec app knex migrate:rollback
    ```

# Running

- API Graphql playground:
  ```sh
      http://localhost:1234/playground
  ```
- Fill HTTP HEADERS:
  `{ "authorization": "Bearer admin_token" }`

  > When start with docker-compose up, get admin_token on terminal

- Example query users:
  ```sh
      {
        users(first: 10){
        edges {
          node{
            name
            email
            role
            createdAt
            updatedAt
          }
        }
        }
      }
  ```
