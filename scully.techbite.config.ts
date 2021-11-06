import { ScullyConfig, setPluginConfig } from '@scullyio/scully';

setPluginConfig('md', { enableSyntaxHighlighting : true});  

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "techbite",
  outDir: './dist/static',
  puppeteerLaunchOptions: {args: ['--no-sandbox', '--disable-setuid-sandbox'],},
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog"
      }
    },
  }
};