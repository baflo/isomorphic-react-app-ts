# isomorphic-react-app-ts

Another React app boilerplate. The two most important are that everything is in TypeScript and that it supports server side rendering from the beginning.

## Basic ideas

- Good development support
- Everything TypeScript
- Opinionated folder structure
- CSS Modules and File Loader for structural component support

## Wishlist

- [x] Hot Module Replacement for both client and server side
- [ ] Provide default work flow for server side HMR import
- [x] CSS Modules
- [ ] Builtin i18n support
- [ ] Redux
- [ ] React Router 4, ReactRouterRedux 5
- [ ] Redux-Forms
- [ ] Socket.io

## Improvements needed

- Check if client HMR works correctly (seems to update the whole page).
- Better CSS Modules (importing new files creates errors in webpack)
- Scripts to start only server dev, only client, or both (style output, assets, etc., must be setup appropriately)
