import defaultOptions, { validateOptions } from './default-options'

exports.onPreBootstrap = validateOptions

exports.onCreatePage = ({ actions: { deletePage }, page, reporter }, pluginOptions) => {
  const options = {
    ...defaultOptions,
    ...pluginOptions,
  }

  if (process.env.NODE_ENV !== 'production' && options.productionOnly) {
    return null
  }

  const excludeMatchers = Array.isArray(options.exclude) ? options.exclude : [options.exclude]

  for (let i = 0; i < excludeMatchers.length; i++) {
    if (excludeMatchers[i].test(page.path)) {
      deletePage(page)
      if (options.verbose) {
        reporter.info(`Archived page: ${page.path}`)
      }
      break
    }
  }

  return null
}
