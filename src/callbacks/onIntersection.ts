import type { LoadeerElement, LoadeerOptions } from '../types'
import { isLoaded, onLoad } from './index'

export function onIntersection(options: LoadeerOptions): IntersectionObserverCallback {
  return (entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting)
        continue

      const target = entry.target as LoadeerElement

      observer.unobserve(target)

      if (isLoaded(target))
        continue

      onLoad(target, options)
      options?.onLoaded?.(target)
    }
  }
}
