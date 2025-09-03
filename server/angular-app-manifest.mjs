
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://maduzinha04.github.io/google-fit-viewing/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/google-fit-viewing"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 24716, hash: 'deb42a934b05e98ce351f471c8f2c4b2cb5b0de61b35554e5bdc1287ab784f4f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17169, hash: 'cc0190db6624d8b1e338ca59a1af190c268f0ca7a476fb7f5d4d523605c44ce6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 107691, hash: '5cc737e0d6462d78dab883a784e3d01385fc1b7a1bdfb6ca19d74fe18bf4d4fb', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-MC7DNLBQ.css': {size: 8100, hash: '8P5gQXGkqW4', text: () => import('./assets-chunks/styles-MC7DNLBQ_css.mjs').then(m => m.default)}
  },
};
