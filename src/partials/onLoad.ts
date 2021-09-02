export default (element: HTMLImageElement): void => {
  const newSrc = element.dataset.src;
  if (newSrc) {
    element.src = newSrc;
    delete element.dataset.src;
  }

  const newSrcset = element.dataset.srcset;
  if (newSrcset) {
    element.srcset = newSrcset;
    delete element.dataset.srcset;

    const newSizes = element.dataset.sizes;
    if (newSizes) {
      element.sizes =
        newSizes === "auto" ? `${element.offsetWidth}px` : newSizes;
    }
  }
};
