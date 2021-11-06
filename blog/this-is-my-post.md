---
title: 'This is my post'
description: 'blog description'
published: true
---

# This is my post
hello


```javascript  
import { ScullyConfig } from '@scullyio/scully';  
export const config: ScullyConfig = {  
  projectRoot: "./src",  
  projectName: "portfolio",  
  outDir: './dist/static',  
  routes: {  
    '/blog/:slug': {  
      type: 'contentFolder',  
      slug: {  
        folder: "./blog"  
      }  
    },  
  }  
};  
```  
