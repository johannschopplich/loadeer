import { hasNativeLoadingSupport } from "../utils";

export default (element: HTMLImageElement): void => {
  const { dataset } = element;
  const { src, srcset, sizes } = dataset;

  if (hasNativeLoadingSupport && element.loading !== "lazy") {
    element.loading = "lazy";
  }

  if (src) {
    element.src = src;
    delete dataset.src;
  }

  if (srcset) {
    element.srcset = srcset;
    delete dataset.srcset;

    if (sizes) {
      element.sizes = sizes === "auto" ? `${element.offsetWidth}px` : sizes;
    }
  }
};
