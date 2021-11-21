export type MaybeArray<T> = T | Array<T>;

export type LoadeerInput<T extends HTMLElement> =
  | string
  | MaybeArray<T>
  | NodeListOf<T>;

export interface LoadeerOptions {
  root?: Element | Document;
  rootMargin?: string;
  threshold?: number | number[];
  onLoaded?: <T extends HTMLElement>(element: T) => void;
  useNativeLoading?: boolean;
}
