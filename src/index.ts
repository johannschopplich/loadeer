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
  ) {}

  public observe(): void {
    const { root, rootMargin, threshold, onLoaded } = this.options;
    const elements = toElementsArray(this.selector, this.options?.root);

    if (!hasNativeLoadingSupport) {
      this.observer = new IntersectionObserver(onIntersection(onLoaded), {
        root,
        rootMargin,
        threshold,
      });
    }

    for (const element of elements) {
      if (isLoaded(element)) continue;

      if (hasNativeLoadingSupport || isCrawler) {
        onLoad(element);
        this.options?.onLoaded?.(element);
        continue;
      }

      this.observer?.observe(element);
    }
  }

  /**
   * Load an element before it gets visible in the viewport
   * (has no effect if the browser supports `loading` attribute)
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
