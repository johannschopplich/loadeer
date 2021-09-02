import { isLoaded, onLoad } from "./index";
import type { LoadeerOptions } from "../types";

export default (onLoaded?: LoadeerOptions["onLoaded"]) =>
  (
    entries: Array<IntersectionObserverEntry>,
    observer: IntersectionObserver
  ): void => {
    for (const entry of entries) {
      if (entry.intersectionRatio > 0 || entry.isIntersecting) {
        const target = <HTMLImageElement>entry.target;
        observer.unobserve(target);

        if (isLoaded(target)) continue;

        onLoad(target);
        onLoaded?.(target);
      }
    }
  };
