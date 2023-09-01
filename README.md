<h2 align="center">Test project</h2>

## Pre-requisites

- Docker
- Docker Compose plugin at least __3.8__

************************

__This application is containerized__
so it has two *compose* files according to your needs

### Prod

build new project

```bash
$ docker compose up -d --build
```

stop project

```bash
$ docker compose down
```

### Dev

build new project

```bash
$ docker compose -f ./docker-compose-dev.yml up -d --build
```

stop project

```bash
$ docker compose -f ./docker-compose-dev.yml up -d --build
```
