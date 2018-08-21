# gatsby-plugin-archives

Gatsby plugin for ignoring files and directories on build.

## Installing

`npm install --save gatsby-plugin-archives`

## How to use

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-archives`,
    options: {
        // Files and directories to exclude. Default: ["archive/"]
        exclude: ["archive/"],
        // Make excludes case sensitive. Default: false
        caseSensitive: false
    },
  },
]
```

## Authors

* **Austin Gordon** - *Development* - [GitHub](https://github.com/AustinLeeGordon)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details