import { z } from "zod";

import products from "../../data/products.json";

const inputSchema = z.object({
  id: z.string(),
});

export default async function getProductById(
  _: unknown,
  args: z.infer<typeof inputSchema>,
) {
  const { id } = inputSchema.parse(args);

  console.log(id);

  const product = products.find((product) => product.id === id);

  return product;
}
