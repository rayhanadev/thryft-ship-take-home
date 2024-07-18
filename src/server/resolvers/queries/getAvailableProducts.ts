import { z } from "zod";

import products from "../../data/products.json";

// TODO(rayhanadev): stretch goal - move products to a database
// using drizzle and fetch it from there instead of validating
// json at runtime.

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

export default async function getAvailableProducts() {
  return products;
}
