import type { LoadeerInput } from './types'

export const isCrawler = !('onscroll' in window) || /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)

export function toElementsArray<T extends HTMLElement>(
  input: LoadeerInput<T>,
  root: Element | Document = document,
): T[] {
  if (typeof input === 'string')
    return [...root.querySelectorAll<T>(input)]

  if (input instanceof Element)
    return [input]

  return [...input]
}
