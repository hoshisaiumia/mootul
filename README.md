# Mootul

> An **open-source**, **private** messaging app, built to be easy to run and easy to audit.

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED)

> ⚠️ **Work in progress.** The API and database schema may change without notice. Do not use it in production with sensitive data until a stable release exists.

## About

Mootul is a messaging app with private conversations (DMs), a familiar chat-style interface, and a clear goal: the code is open, your data is yours, and anyone can host their own instance.

### Principles

- **Open source:** all code is public, so it can be read, audited, and improved by the community.
- **Privacy first:** collect as little data as possible, with no ads and no trackers.
- **Self-hostable:** starts with a single command using Docker, with no dependency on third-party services.
- **Simple:** frontend and backend in the same project, with few moving parts to understand and maintain.

## Features

- [ ] Sign up and sign in
- [ ] Private conversations (DMs)
- [ ] Real-time messaging
- [ ] Conversation history
- [ ] End-to-end encryption
- [ ] Group chats
- [ ] File and image sharing
- [ ] Notifications

Check items off here as the project progresses.

## Tech stack

| Layer             | Technology                                  |
| ----------------- | ------------------------------------------- |
| Frontend/backend  | [Next.js](https://nextjs.org) (App Router)  |
| Styling           | [Tailwind CSS](https://tailwindcss.com)     |
| Database          | [PostgreSQL](https://www.postgresql.org) 16 |
| Infrastructure    | Docker and Docker Compose                   |

## Getting started

### Prerequisites

- [Git](https://git-scm.com)
- [Docker](https://docs.docker.com/get-docker/) with Docker Compose
- On Windows, use WSL 2 with the Docker Desktop WSL integration enabled

### Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:hoshisaiumia/mootul.git
   cd mootul
   ```

2. Create the environment files from the examples:

   ```bash
   cp env/db.env.example env/db.env
   cp env/web.env.example env/web.env
   ```

3. Edit both files and **change the passwords**. The user, password, and database name must match between `env/db.env` and the `DATABASE_URL` in `env/web.env`.

4. Start the services:

   ```bash
   docker compose up --build
   ```

5. Open [http://localhost:3000](http://localhost:3000).

To check the database connection, visit [http://localhost:3000/api/health](http://localhost:3000/api/health).

### Useful commands

```bash
docker compose exec db psql -U postgres -d mootul   # open psql
docker compose exec web npm install <package>       # install a dependency
docker compose down                                 # stop (keeps data)
docker compose down -v                              # stop and wipe the database
```

## Environment variables

Each service has its own file inside `env/`. The real files are **not** committed to Git; only the `.example` files are.

| File           | Variable            | Description                                  |
| -------------- | ------------------- | -------------------------------------------- |
| `env/db.env`   | `POSTGRES_USER`     | PostgreSQL user                              |
| `env/db.env`   | `POSTGRES_PASSWORD` | PostgreSQL password                          |
| `env/db.env`   | `POSTGRES_DB`       | Database name                                |
| `env/web.env`  | `DATABASE_URL`      | Connection string used by Next.js            |
| `env/web.env`  | `WATCHPACK_POLLING` | Hot reload on mounted volumes (optional)     |

## Project structure

```
mootul/
├── app/              # Pages, layouts, and API routes (App Router)
│   └── api/
├── lib/              # Shared code (e.g. database connection)
├── env/              # Per-service environment variables
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Contributing

Contributions are welcome.

1. Fork the project
2. Create a branch for your change: `git checkout -b my-feature`
3. Commit your changes: `git commit -m "Describe your change"`
4. Push the branch: `git push origin my-feature`
5. Open a Pull Request

Found a bug or have an idea? Open an [issue](../../issues).

### Security

If you find a vulnerability, **please do not open a public issue**. Contact the maintainer directly so it can be fixed before it is disclosed.

## License

Choose a license and add a `LICENSE` file at the repository root. Common options for open-source projects:

- **MIT:** very permissive; anyone can use and modify the code, including in closed-source products.
- **AGPL-3.0:** anyone who hosts a modified version as a service must publish that version's source code. Often a good fit for network apps.

Once you decide, replace this section with: `Distributed under the <NAME> license. See the LICENSE file.`