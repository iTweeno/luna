FROM node:16-alpine AS appbuild
WORKDIR /app
COPY . ./
RUN apk add --no-cache curl && curl -sL https://unpkg.com/@pnpm/self-installer | node
RUN pnpm install --frozen-lockfile --strict-peer-dependencies
RUN pnpm run build

FROM node:16-alpine
WORKDIR /app
COPY --from=appbuild ./app/dist ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY prisma/ ./
COPY run.sh ./
RUN apk add --no-cache curl && curl -sL https://unpkg.com/@pnpm/self-installer | node
RUN pnpm install --production --frozen-lockfile --strict-peer-dependencies
RUN pnpm prisma generate
EXPOSE 80

ENTRYPOINT [ "/bin/sh", "./run.sh" ]
#CMD ["pnpm", "prisma", "migrate", "deploy", ";", "node", "."]