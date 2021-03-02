# postlight-code-challenge

## Setup

Install parcel, which we use as an all-in-one dev server, bundler, and installation tool.
`npm i -g parcel-bundler`

You will still need to generate css with tailwind, which you can do with:
`npm run buildCSS`

Then just run:
`parcel src/index.html`

You shouldn't need to do anything else, parcel should handle installation of all dependencies when run, should setup the dev server at `http://localhost:1234`.

To deploy to production, run `parcel build src/index.html`
