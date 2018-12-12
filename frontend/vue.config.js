const config = require('../shared/config')


const devServer = {
    publicPath: config.urlPrefix,
    proxy: {
        [`${config.urlPrefix}/api`]: {
            target: `http://localhost:${config.servicePort}`,
        },
    }
}

module.exports = {
    baseUrl: './',
    devServer,
    crossorigin: 'use-credentials',
}