module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: '8090',
        open: true
    },
    lintOnSave: process.env.NODE_ENV !== 'production'
}
