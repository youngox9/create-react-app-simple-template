const PROXY_DEV_URL = `http://10.2.0.17`;
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `${PROXY_DEV_URL}/docaptures/api`,
      pathRewrite: {
        "^/api/": "/", // remove base path
      },
      changeOrigin: true,
    })
  );
};
