# Luna API

This API serves the purpose of checking for data in a database using postgres Full text search.

## Enviroment_Variables

The following environment variabled are required to run the container:

- **WEBSERVER_PORT**: The port the API will run on
- **WEBSERVER_ADRESS**: The enviroment node will run on, prod or dev.
- **DATABASE_URL**: Your database URL

## Development

Local development requires the following software:

- NodeJS
- PNPM

To install the dependencies:

- `pnpm install`

If everything is set up correctly, run the following command for an optimal development environment, which will watch for changes in all the necessary files and auto-restart the server if necessary.

- `pnpm run dev`

For Deployment, the correct commands are:

- `pnpm run build`
- `pnpm run prod`

Linting can be run using the following commands:

- `pnpm run lint`

Testing can be run using the following commands:

- `pnpm jest`

For deployment:

- `docker compose up`
