export const schema = /* GraphQL */`
  type Query {
    getAvailableProducts: [Product!]!
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