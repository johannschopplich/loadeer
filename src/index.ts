import {
  isCrawler,
  isLoaded,
  onIntersection,
  onLoad,
  onResize,
} from "./partials/index";
import { debounceFn, toElementsArray } from "./utils/index";

export interface LoadeerOptions {
  root?: IntersectionObserverInit["root"];
  rootMargin?: IntersectionObserverInit["rootMargin"];
  threshold?: IntersectionObserverInit["threshold"];
  onLoaded?: (element: HTMLImageElement) => void;
}

/**
 * Tiny, performant, SEO-friendly lazy loading library
 */
export class Loadeer {
  public readonly observer: IntersectionObserver;

  constructor(
    protected readonly selector:
      | string
      | HTMLImageElement
      | Array<HTMLImageElement>
      | NodeListOf<HTMLImageElement> = "[data-lazyload]",
    protected readonly options: LoadeerOptions = {}
  ) {
    const {
      root = document,
      rootMargin = "0px",
      threshold = 0,
      onLoaded,
    } = this.options;

    this.observer = new IntersectionObserver(onIntersection(onLoaded), {
      root,
      rootMargin,
      threshold,
    });
  }

  public observe(): void {
    const elements = toElementsArray<HTMLImageElement>(
      this.selector,
      this.options.root ?? document
    );

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

  public triggerLoad(element: HTMLImageElement): void {
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
