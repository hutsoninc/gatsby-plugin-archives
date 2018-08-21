const defaultOptions = require('./default-options');

exports.onCreatePage = ({ page, boundActionCreators }, pluginOptions) => {
    const { deletePage } = boundActionCreators;
    
    const options = { ...pluginOptions };
    delete options.plugins;

    let { exclude, caseSensitive, ...rest } = { ...options, ...defaultOptions };

    let path = page.path;
    
    if(!caseSensitive) {
        path = path.toLowerCase();
        exclude = exclude.map(e => e.toLowerCase());
    }

    return new Promise(resolve => {
        for(let i = 0; i < exclude.length; i++) {
            if(path.indexOf(exclude[i]) >= 0) {
                deletePage(page);
            }
        }
        resolve();
    });
};