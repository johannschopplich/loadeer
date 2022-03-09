export type MaybeArray<T> = T | Array<T>;

export type LoadeerElement = HTMLImageElement | HTMLVideoElement;

export type LoadeerInput<T extends HTMLElement> =
  | string
  | MaybeArray<T>
  | NodeListOf<T>;

export interface LoadeerOptions {
  root?: Element | Document;
  rootMargin?: string;
  threshold?: number | number[];
  onLoaded?: (element: LoadeerElement) => void;
  useNativeLoading?: boolean;
}
