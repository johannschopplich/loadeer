import { hasNativeLoadingSupport } from "../utils";

export default (element: HTMLImageElement): void => {
  const { dataset } = element;
  const { sizes } = dataset;

  if (hasNativeLoadingSupport && element.loading !== "lazy") {
    element.loading = "lazy";
  }

  if (dataset.src) {
    element.src = dataset.src;
    delete dataset.src;
  }

  if (dataset.srcset) {
    element.srcset = dataset.srcset;
    delete dataset.srcset;

    if (sizes) {
      element.sizes = sizes === "auto" ? `${element.offsetWidth}px` : sizes;
    }
  }
};
