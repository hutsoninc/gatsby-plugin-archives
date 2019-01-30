const matcher = require('matcher');
const defaultOptions = require('./default-options');

exports.onCreatePage = ({ page, actions }, options) => {
    const { deletePage } = actions;

    options = Object.assign({}, defaultOptions, options);

    if (options.plugins) {
        delete options.plugins;
    }

    let { exclude, caseSensitive } = options;

    if (typeof exclude === 'string') {
        exclude = [exclude];
    }

    return new Promise(resolve => {
        for (let i = 0; i < exclude.length; i++) {
            let match = matcher.isMatch(page.path, exclude[i], {
                caseSensitive,
            });

            if (match) {
                deletePage(page);
                break;
            }
        }
        resolve();
    });
};
