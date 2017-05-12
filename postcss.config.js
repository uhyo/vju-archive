const variables = require('./src/renderer/css/theme.json');
module.exports = {
    plugins: [
        require('postcss-nested')(),
        require('postcss-css-variables')({
            variables,
        }),
        require('postcss-color-function')(),
    ]
}
