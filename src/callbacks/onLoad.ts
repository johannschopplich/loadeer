import { hasNativeLoadingSupport } from '../utils'
import type { LoadeerElement, LoadeerOptions } from '../types'

export function onLoad(element: LoadeerElement, options: LoadeerOptions) {
  const { useNativeLoading = false } = options
  const { dataset } = element
  const { src, srcset, sizes, poster } = dataset

  if (src) {
    element.src = src
    delete dataset.src
  }

  if (element instanceof HTMLVideoElement) {
    if (poster) {
      element.poster = poster
      delete dataset.poster
    }
  }
  else {
    if (
      element instanceof HTMLImageElement
      && useNativeLoading
      && hasNativeLoadingSupport
      && element.loading !== 'lazy'
    )
      element.loading = 'lazy'

    if (srcset) {
      element.srcset = srcset
      delete dataset.srcset

      if (sizes)
        element.sizes = sizes === 'auto' ? `${element.offsetWidth}px` : sizes
    }
  }
}
