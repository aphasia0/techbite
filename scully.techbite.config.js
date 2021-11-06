"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var scully_1 = require("@scullyio/scully");
scully_1.setPluginConfig('md', { enableSyntaxHighlighting: true });
exports.config = {
    projectRoot: "./src",
    projectName: "techbite",
    outDir: './dist/static',
    puppeteerLaunchOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox'], },
    routes: {
        '/blog/:slug': {
            type: 'contentFolder',
            slug: {
                folder: "./blog"
            }
        },
    }
};
