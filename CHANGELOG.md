# Change Log

## [1.0.0] 2017-08-01
### First Release Tirolibre

- Bootstrap 4
- This project uses [vue-cli 3](https://github.com/vuejs/vue-cli).
  - Get rid of old webpack template and make use of newest vue-cli 3. The project has almost no configuration files and
  should work out of the box if you copy paste the `src` folder into a newly scaffolded Vue CLI 3 project.
- Overall project structure improvements
  - The project structure resembles a default [nuxt project structure](https://nuxtjs.org/)
  We have a breakdown of
  - `components` folder (only UI components)
  - `pages` folder which contains pages/views
  - `layout` folder which contains layout related components
  - `assets` folder which contains scss, images and fonts
  - `plugins` folder which has project related plugins
  - `router` folder which contains routes

- Component improvements
  - Use of `vue-notifyjs` for notifications
  - Improvements for Sidebar. Option to declare links as children inside Sidebar slot. SSR support.
