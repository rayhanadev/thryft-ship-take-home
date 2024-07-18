FROM oven/bun AS build

WORKDIR /app

COPY bun.lockb . 
COPY package.json . 

RUN bun install --frozen-lockfile

COPY src ./src

RUN bun build ./src/server/index.ts --compile --outfile server

FROM ubuntu:22.04

WORKDIR /app

COPY --from=build /app/server /app/server

CMD ["/app/server"]
