import { isLoaded, onLoad } from "./index";
import type { LoadeerOptions } from "../types";

type Entry = IntersectionObserverEntry & {
  readonly target: HTMLImageElement & HTMLVideoElement;
};

export default (options: LoadeerOptions): IntersectionObserverCallback =>
  (entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      const { target } = <Entry>entry;

      observer.unobserve(target);

      if (isLoaded(target)) continue;

      onLoad(target, options);
      options?.onLoaded?.(target);
    }
  };
