# gatsby-plugin-archives

[![Build Status](https://travis-ci.com/hutsoninc/gatsby-plugin-archives.svg?branch=master)](https://travis-ci.com/hutsoninc/gatsby-plugin-archives) [![Current npm package version](https://img.shields.io/npm/v/gatsby-plugin-archives.svg)](https://www.npmjs.com/package/gatsby-plugin-archives) 

Gatsby plugin for ignoring files and directories on build.

## Installing

`npm install --save gatsby-plugin-archives`

## Usage

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-archives`,
    options: {
        // Files and directories to exclude
        // Default: /archive/i
        exclude: [/(archive|templates)/i, /example-page.js/],
        
        // Only archive pages in production
        // Default: false
        productionOnly: true,

        // Log when pages are archived
        // Default: false
        verbose: true,
    },
  },
]
```

## License

MIT © [Hutson Inc](https://www.hutsoninc.com)