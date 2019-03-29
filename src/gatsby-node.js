const matcher = require('matcher');
const defaultOptions = require('./default-options');

exports.onCreatePage = ({ page, actions }, options) => {
    options = Object.assign({}, defaultOptions, options);
    
    const { deletePage } = actions;
    let { exclude, caseSensitive } = options;

    if(process.env.NODE_ENV !== 'production' && options.productionOnly) {
        return;
    }

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
