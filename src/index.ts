import { isLoaded, onIntersection, onLoad } from "./partials/index";
import {
  hasNativeLoadingSupport,
  isCrawler,
  toElementsArray,
} from "./utils/index";
import type { LoadeerInput, LoadeerOptions } from "./types";

/**
 * Tiny, performant, SEO-friendly lazy loading library
 */
export default class Loadeer<T extends HTMLImageElement> {
  public observer?: IntersectionObserver;

  constructor(
    protected readonly selector: LoadeerInput<T> = "[data-lazyload]",
    protected readonly options: LoadeerOptions = {}
  ) {
    const { root, rootMargin, threshold, onLoaded } = this.options;

    if (!hasNativeLoadingSupport) {
      this.observer = new IntersectionObserver(onIntersection(onLoaded), {
        root,
        rootMargin,
        threshold,
      });
    }
  }

  public observe(): void {
    const elements = toElementsArray(this.selector, this.options?.root);

    for (const element of elements) {
      if (isLoaded(element)) continue;

      if (hasNativeLoadingSupport || isCrawler) {
        onLoad(element);
        this.options?.onLoaded?.(element);
      } else {
        this.observer?.observe(element);
      }
    }
  }

  /**
   * Load an element before it gets visible in the viewport
   * (intended for browsers without `loading` attribute support)
   */
  public triggerLoad(element: T): void {
    if (isLoaded(element)) return;

    onLoad(element);
    this.options?.onLoaded?.(element);
  }
}

// Automatically initiate if `init` attribute is present
let s;
if ((s = document.currentScript) && s.hasAttribute("init")) {
  const instance = new Loadeer();
  instance.observe();
}
