const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/vapi',
        createProxyMiddleware({
            target: 'http://localhost:8080/vapi',
            changeOrigin: true,
        })
    );
    app.use(
        '/association',
        createProxyMiddleware({
            target: 'http://localhost:7100',
            changeOrigin: true,
        })
    );
};