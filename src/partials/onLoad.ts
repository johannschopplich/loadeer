import { hasNativeLoadingSupport } from "../utils";
import type { LoadeerOptions } from "../types";

export default (element: HTMLImageElement, options: LoadeerOptions): void => {
  const { useNativeLoading = false } = options;
  const { dataset } = element;
  const { src, srcset, sizes } = dataset;

  if (
    useNativeLoading &&
    hasNativeLoadingSupport &&
    element.loading !== "lazy"
  ) {
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
