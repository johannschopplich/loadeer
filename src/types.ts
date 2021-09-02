export type Nullable<T> = T | null | undefined;
export type Arrayable<T> = T | Array<T>;

export type LoadeerInput<T extends Node> =
  | string
  | Arrayable<T>
  | NodeListOf<T>;

export interface LoadeerOptions {
  root?: Element | Document;
  rootMargin?: string;
  threshold?: number | number[];
  onLoaded?: <T extends Element>(element: T) => void;
}
