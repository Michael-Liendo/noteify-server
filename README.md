# Noteify

This is a web application built with Fastify and Svelte, which provides an API for user management with authentication using JSON Web Tokens (JWT). It allows users to sign up, log in, get their user information, and retrieve a list of all users. The application also implements input validation, error handling, and database integration with Knex.js.

## Requerimientos

- Node.js >= 14
- Docker y Docker Compose

## Installation

1. Clone the repository: `git clone https://github.com/Michael-Liendo/noteify-server`.
2. Copy the file `.env.example` and rename it to `.env`: `cp .env.example .env`.
3. Set the environment variables in the `.env` file.
4. Run the npm install command to install the project dependencies.

## Use

1. Run the `npm run dev` command to start the server in development mode.
2. Run the `docker-compose up` command to start the server with Docker Compose.

## Contribution

If you wish to contribute to the project, please follow the steps below:

1. Perform a fork of the project.
2. Create a branch with the new feature or bug fix: `git checkout -b branch-name`.
3. Make your changes and commit them: `git commit -m "Add new feature"`.
4. Push to the branch: `git push origin branch-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
