const API_TARGET = 'https://pdf-tools.antoniogiordano.dev';
const API_ALLOWED_ORIGIN = 'https://antoniogiordano.dev';

module.exports = {
  '/api': {
    target: API_TARGET,
    secure: true,
    changeOrigin: true,
    logLevel: 'silent',
    onProxyReq(proxyReq) {
      proxyReq.setHeader('Origin', API_ALLOWED_ORIGIN);
    },
    onProxyRes(proxyRes, req) {
      const origin = req.headers.origin;
      if (origin) {
        proxyRes.headers['access-control-allow-origin'] = origin;
        proxyRes.headers['access-control-allow-credentials'] = 'true';
      }
    },
  },
};
