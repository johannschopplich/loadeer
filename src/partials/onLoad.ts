export default (element: HTMLImageElement): void => {
  const newSrc = element.dataset.src;
  if (newSrc) element.src = newSrc;

  const newSrcset = element.dataset.srcset;
  if (newSrcset) {
    element.srcset = newSrcset;

    const newSizes = element.dataset.sizes;
    if (newSizes) {
      element.sizes =
        newSizes === "auto" ? `${element.offsetWidth}px` : newSizes;
    }
  }

  element.dataset.loaded = "true";
};
