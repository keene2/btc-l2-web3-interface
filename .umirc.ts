import { defineConfig } from 'umi';

export default defineConfig({
  title: 'ZKSats: The first ZK Rollup Bitcoin Layer 2 network',
  favicons: ['/favicon.png'],
  metas: [
    {
      name: 'keywords',
      content:
        'Bitcoin L2, Bitcoin Layer 2, ZK-rollup, EVM-compatible, BTC gas, Scalability, Security, Decentralization, Cost-effectiveness',
    },
    {
      name: 'description',
      content:
        'ZKSats is a decentralized Bitcoin ZK rollup second-layer network that can increase transaction speeds and expand application diversity without sacrificing security.',
    },
  ],
  plugins: ['@umijs/plugins/dist/react-query', '@umijs/plugins/dist/valtio', '@umijs/plugins/dist/tailwindcss'],
  reactQuery: {},
  valtio: {},
  routes: [
    { path: '/', component: 'Home' },
    { path: '/ecosystem', component: 'Ecosystem' },
    { path: '/bridge', component: 'Bridge' },
    { path: '/launchpad', component: 'Launchpad' },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/api': {
      target: 'http://142.171.239.146:9000',
      // target: 'https://api.zksats.io',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  tailwindcss: {},
});
