let cssLoaded = false;

export const renderCSS = (path) => {
  if (!cssLoaded) {
    cssLoaded = true;
    import(path)
  }
  return true;
};
