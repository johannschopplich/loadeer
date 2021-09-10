export type Nullable<T> = T | null | undefined;
export type Arrayable<T> = T | Array<T>;

export type LoadeerInput<T extends HTMLElement> =
  | string
  | Arrayable<T>
  | NodeListOf<T>;

export interface LoadeerOptions {
  root?: Element | Document;
  rootMargin?: string;
  threshold?: number | number[];
  onLoaded?: <T extends HTMLElement>(element: T) => void;
}
