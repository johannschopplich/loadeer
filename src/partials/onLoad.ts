import { hasNativeLoadingSupport } from "../utils";

export default (element: HTMLImageElement): void => {
  const data = element.dataset;

  if (hasNativeLoadingSupport && element.loading !== "lazy") {
    element.loading = "lazy";
  }

  if (data.src) {
    element.src = data.src;
    delete data.src;
  }

  if (data.srcset) {
    element.srcset = data.srcset;
    delete data.srcset;

    const sizes = data.sizes;
    if (sizes) {
      element.sizes = sizes === "auto" ? `${element.offsetWidth}px` : sizes;
    }
  }
};
