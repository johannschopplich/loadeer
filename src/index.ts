import {
  isCrawler,
  isLoaded,
  onIntersection,
  onLoad,
  onResize,
} from "./partials/index";
import { debounceFn, toElementsArray } from "./utils/index";
import type { Arrayable } from "@antfu/utils";

export interface LoadeerOptions {
  root?: Element | Document;
  rootMargin?: string;
  threshold?: number | number[];
  onLoaded?: <T extends Element>(element: T) => void;
}

/**
 * Tiny, performant, SEO-friendly lazy loading library
 */
export default class Loadeer<T extends HTMLImageElement> {
  public readonly observer: IntersectionObserver;

  constructor(
    protected readonly selector:
      | string
      | Arrayable<T>
      | NodeListOf<T> = "[data-lazyload]",
    protected readonly options: LoadeerOptions = {}
  ) {
    const { root, rootMargin, threshold, onLoaded } = this.options;

    this.observer = new IntersectionObserver(onIntersection(onLoaded), {
      root,
      rootMargin,
      threshold,
    });
  }

  public observe(): void {
    const elements = toElementsArray(this.selector, this.options?.root);

    for (const element of elements) {
      if (isLoaded(element)) continue;

      if (isCrawler) {
        onLoad(element);
        this.options?.onLoaded?.(element);
        continue;
      }

      this.observer.observe(element);
    }

    const debounced = debounceFn(() => onResize(elements), 100);
    window.addEventListener("resize", debounced);
  }

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
