import { createSchema, createYoga } from "graphql-yoga";
import { z } from "zod";

// TODO(rayhanadev): stretch goal - move products to a database
// using drizzle and fetch it from there instead of validating
// json at runtime.
import products from "./data/products.json";
import { Query } from "./resolvers";
import { schema } from "./schema";

const Variant = z.object({
  id: z.number(),
  name: z.string(),
});

const Product = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  variants: z.array(Variant),
});

const productsSchema = z.array(Product);

const results = productsSchema.safeParse(products);

if (!results.success) {
  console.error(results.error);
  throw new Error("Failed to parse products data");
}

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
