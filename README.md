# gatsby-plugin-archives

[![Current npm package version](https://img.shields.io/npm/v/gatsby-plugin-archives.svg)](https://www.npmjs.com/package/gatsby-plugin-archives) 

Gatsby plugin for ignoring files and directories on build. Uses [matcher](https://github.com/sindresorhus/matcher) wildcard matching.

## Installing

`npm install --save gatsby-plugin-archives`

## How to use

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-archives`,
    options: {
        // Files and directories to exclude. Default: ["*/archive/*"]
        exclude: ["*/test-pages/*"],
        // Make excludes case sensitive. Default: false
        caseSensitive: false,
        // Only archive pages in production. Default: false
        productionOnly: true,
    },
  },
]
```

## License

MIT © [Hutson Inc](https://www.hutsoninc.com)