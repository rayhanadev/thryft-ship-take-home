import { createSchema, createYoga } from "graphql-yoga";

import { Query } from "./resolvers";
import { schema } from "./schema";

const yoga = createYoga({
  schema: createSchema({
    typeDefs: schema,
    resolvers: { Query },
  }),
});

const server = Bun.serve({
  fetch: yoga,
  port: 4000,
});

const endpoint = new URL(
  yoga.graphqlEndpoint,
  `http://${server.hostname}:${server.port}`,
);

console.info(`Server is running on ${endpoint.toString()}`);
