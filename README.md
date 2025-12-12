This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## required environment variables

```
CLIENT_ID=<secret>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
BETTER_AUTH_SECRET=irgendöppis
E2E_HOST=https://hg-mumble-taupe.vercel.app/
API_URL=https://qwacker-api-http-prod-927407260649.europe-west6.run.app/
NEXT_PUBLIC_API_URL=https://mumble-api-prod-714602723919.europe-west6.run.app #used for SSE endpoint - directly from client

```

## e2e tests

after pnpm i, run:
```
npx playwright install
```
to setup local browser binaries, only needs to be once per playwright version

## Mock Server

before you can use the mock server, you need to install prism:
```
npm i -g @stoplight/prism-cli
```

after installing the thing, you can run the mockserver:
```
pnpm mock
OR: prism mock scripts/generate/swagger.json
```
note that this only mocks the quacker api, the auth will still be necessary (i think)


change the API_URL in your .env to:
```
API_URL=http://localhost:4010
OR: just run:
pnpm dev:mock
```

### i need other mock data than the server returns

you can change the data from the server by changin the "examples" in the swagger.json file:
```json
{
  "properties": {
    "id": {
      ...
      "example": "if i change this, the new value will be returned for every api call"
    }
  }
}
```

if you need dynamic data: you're on your own