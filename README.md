# Spaghetti

We don't know what it is for now.

### Prerequisites

Git, Node.js, PostgreSQL, Docker/Docker Compose, needs to be installed (latest).

### Installing

To run application locally you need to make a few steps:

- install packages

```
npm install
```

- run migrations and seeds

```
npm run migrate
npm run seed
```

- finally

```
npm start
```
Application is running on http://localhost:1337/

## Docker container

To run application in docker container and expose on local port

```
docker-compose up
```

Stop docker container:

```
docker-compose down
```

Remove stopped containers:

```
docker system prune -f
```

Rebuild container:

```
docker-compose up --build
```

## Built With

- [Express](http://expressjs.com/) - Node.js web application framework
- [Docker](https://www.docker.com/) - Container technology for Linux
- [PostgreSQL](https://www.postgresql.org/) - Open source relational database
- [Objection](https://vincit.github.io/objection.js/) - An ORM for Node.js
- [Knex](https://knexjs.org/) - SQL query builder for Postgres
