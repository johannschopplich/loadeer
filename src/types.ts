export type LoadeerElement = HTMLImageElement | HTMLVideoElement;

export type LoadeerInput<T extends HTMLElement> =
  | T
  | T[]
  | NodeListOf<T>
  | string;

export interface LoadeerOptions {
  root?: Element | Document;
  rootMargin?: string;
  threshold?: number | number[];
  onLoaded?: (element: LoadeerElement) => void;
  useNativeLoading?: boolean;
}
