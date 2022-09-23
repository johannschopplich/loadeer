export type LoadeerElement = HTMLImageElement | HTMLSourceElement | HTMLVideoElement

export type LoadeerInput<T extends HTMLElement> =
  | string
  | T
  | T[]
  | NodeListOf<T>

export interface LoadeerOptions {
  root?: Element | Document
  rootMargin?: string
  threshold?: number | number[]
  onLoaded?: (element: LoadeerElement) => void
  useNativeLoading?: boolean
}
