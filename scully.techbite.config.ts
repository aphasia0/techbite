import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "techbite",
  outDir: './dist/static',
  puppeteerLaunchOptions: {executablePath: '/opt/build/repo/node_modules/chromium'},
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog"
      }
    },
  }
};