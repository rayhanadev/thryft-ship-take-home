# Thryft Ship Take Home Assignment

Howdy, my name is Ray! I'm a Cybersecurity major at Purdue and I have four years of experience working
with Series A and Series B backed companies like [Replit](https://replit.com) and [Deel](https://deel.com),
along with a ton of clients I met through freelancing. I'm not shy to startup culture and the hard work
that is making a startup profitable, but I've worked with many people in similar positions!

My defining quality is being able to work in pretty much any position thats needed. Frontend design and
development? Got it! Backend in Python, Typescript, Golang? Got it! Launching a mobile app on Expo? Got
it! I have quick turnaround times on projects and can learn anything on the fly. It is a skill that's
helped me get pretty far!

I'm really excited to be applying for the SWE position at Thryft Ship. Here's my submission for the take
home assignment. You can see my initial planning in [TODO.txt](./TODO.txt).

This project is also available to preview at [https://thryft-ship-take-home.vercel.app/](https://thryft-ship-take-home.vercel.app/).

Loom: https://www.loom.com/share/0736dce5b55047e0af42988101650e8f?sid=97e8b553-52fd-435b-95c7-ee31d7021ac2

**Contact Information**
- Email: me@rayhanadev.com
- Phone: (817) 470-7345

## Usage

### Development

```sh
bun run dev
```

Will start both the GraphQL API server and Next.js Dev Server. It also starts Caddy as a reverse
proxy. The development client is available at [https://localhost](https://localhost) and the development
server is available at [https://localhost/graphql](https://localhost/graphql).

### Production

For production you will have to deploy the client and server separately. The client is currently
running on Vercel using standard settings for Next.js. The server can be deployed anywhere with Docker
support (I chose [fly.io](https://fly.io)) using the Dockerfile. For convenience everything should be
setup with CI using Github Actions.

## Design choices

Given the specifications I stuck to them as closely as possible! I found that shadcn components worked
nicely with the Figma provided, so I opted to use the library and then change styles where needed. The
only component that really needed to be designed was the products selection. I modified a combobox element
to use the easy navigation functionality and search features, but added dropdowns to select variants and
quantity (similar to research on similar UIs) and decided to display the number of items in the cart in the
placeholder.

I also slightly modified the checkout dialog to nicely feature the products as a list on the side.

## Limitations

The biggest limitation of my work here is an inability to easily/intuitively view the cart. I have several
ideas to improve this UX but working within the constraints of time and the specifications provided I designed
a new interface for the cart.

## Ideas for Improvement

If I could improve this further I would display the items added to the cart to the side of the details form,
similar to how Shop.com and Stripe.com have their e-checkout flows. This would be rather trivial to do – in
fact I was dying to do it – but for time reasons and to be as faithful to the design specifications as possible,
I chose to omit this change.

There's also a bug with Vercel and its static files cache causing the image on the confirmation page to not load
(main reason is filename case sensitivity). A static assets cache purge would fix this.

## Alternative Approaches

Ideally, I would feature the products on a separate page so the user mentally progresses from browsing and
shopping to actually filling out shipping details and confirming their order. Having the products on a separate
page also helps with displaying items to users when they first open the website, drawing them in and increasing
engagement with the storefront.

## Closing Thoughts

I look forward to meeting with y'all! :D
