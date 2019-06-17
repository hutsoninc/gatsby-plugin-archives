import defaultOptions, { validateOptions } from './default-options';

export const onPreBootstrap = validateOptions;

export function onCreatePage({ actions: { deletePage }, page, reporter }, pluginOptions) {
    const options = Object.assign({}, defaultOptions, pluginOptions);

    if (process.env.NODE_ENV !== 'production' && options.productionOnly) {
        return;
    }

    const { exclude, verbose } = options;

    const excludeMatchers = [];

    if (Array.isArray(exclude)) {
        excludeMatchers.push(...exclude);
    } else {
        excludeMatchers.push(exclude);
    }

    for (let i = 0; i < excludeMatchers.length; i++) {
        const match = excludeMatchers[i].test(page.path);

        if (match) {
            deletePage(page);

            if (verbose) {
                reporter.info(`Archived page: ${page.path}`);
            }

            break;
        }
    }
};
