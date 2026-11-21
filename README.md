# Myapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build and SEO files

`npm run build` runs `ng build` and then `node scripts/generate-seo-files.mjs`, which reads the published posts from Supabase and writes:

- `dist/myapp/sitemap.xml` — XML sitemap with `lastmod`, including every `/blog/:id`
- `dist/myapp/_redirects` — canonical `/home` redirects, explicit SPA routes and a real 404 fallback
- `dist/myapp/404.html` — static 404 page with `noindex`

New posts are read from the database at build time, so trigger a new deploy after publishing (Netlify build hook) to refresh HTML, sitemap and redirect rules.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
