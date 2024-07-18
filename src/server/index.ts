import { createSchema, createYoga } from "graphql-yoga";

import { schema } from "./schema";
import { Query } from "./resolvers";

const yoga = createYoga({
  schema: createSchema({
    typeDefs: schema,
    resolvers: { Query },
  })
});

const server = Bun.serve({
  fetch: yoga,
  port: 4000,
})

console.info(
  `Server is running on ${new URL(
    yoga.graphqlEndpoint,
    `http://${server.hostname}:${server.port}`
  )}`
)
