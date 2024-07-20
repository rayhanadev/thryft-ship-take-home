export const schema = /* GraphQL */ `
  type Query {
    getAvailableProducts: [Product!]!
    getProductById(id: String!): Product
  }

  type Variant {
    id: Int!
    name: String!
  }

  type Product {
    id: String!
    name: String!
    image: String!
    price: Float!
    variants: [Variant!]!
  }
`;
