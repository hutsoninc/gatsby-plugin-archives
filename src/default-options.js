import Joi from 'joi'

const optionsSchema = Joi.object().keys({
  exclude: [Joi.object().regex(), Joi.array().items(Joi.object().regex())],
  productionOnly: Joi.boolean(),
  verbose: Joi.boolean(),
})

export function validateOptions({ reporter }, options = {}) {
  delete options.plugins

  const result = optionsSchema.validate(options, {
    abortEarly: false,
    allowUnknown: false,
  })

  if (result.error) {
    const errors = result.error.details.map(detail => detail.message)
    reporter.panic(`Error with \`gatsby-plugin-archives\` plugin options:\n${errors.join('\n')}`)
  }
}

const defaultOptions = {
  exclude: /archive/i,
  productionOnly: false,
  verbose: false,
}

export default defaultOptions