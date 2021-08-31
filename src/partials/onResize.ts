export default (elements: Array<HTMLImageElement>): void => {
  // Re-calculate sizes
  for (const element of elements) {
    if (element.dataset.sizes === "auto") {
      element.sizes = `${element.offsetWidth}px`;
    }
  }
};
