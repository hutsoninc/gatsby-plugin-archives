# gatsby-plugin-archives

[![Current npm package version](https://img.shields.io/npm/v/gatsby-plugin-archives.svg)](https://www.npmjs.com/package/gatsby-plugin-archives) 

Gatsby plugin for ignoring pages on build.

## Installation

`npm install --save gatsby-plugin-archives`

## Usage

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-archives',
      options: {
        // Match files and directories to exclude
        exclude: [/archive/i],
        // Only archive pages in production
        productionOnly: false,
        // Log when pages are archived
        verbose: false,
      },
    },
  ]
}
```

## License

MIT © [Hutson Inc](https://www.hutsoninc.com)