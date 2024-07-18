# Thryft Ship Take Home Assignment

Howdy, my name is Ray! I'm really excited to be applying for the SWE position at Thryft Ship. Here's
my submission for the take home assignment. You can see my initial planning in [TODO.txt](./TODO.txt).

This project is also available to preview at [https://thryft-ship-take-home.vercel.app/](https://thryft-ship-take-home.vercel.app/).

[TODO: INSERT LOOM]

## Usage

### Development

```sh
bun run dev
```

Will start both the GraphQL API server and Next.js Dev Server. It also starts Caddy as a reverse
proxy. The development client is available at [https://localhost](https://localhost) and the development server is available at [https://localhost/graphql](https://localhost/graphql).

### Production

For production you will have to deploy the client and server separately. The client is currently
running on Vercel using standard settings for Next.js. The server can be deployed anywhere with Docker
support (I chose [fly.io](https://fly.io)) using the Dockerfile. For convenience everything should be
setup with CI using Github Actions.

## Design choices

## Limitations

## Ideas for Improvement

## Alternative Approaches

## Closing Thoughts
