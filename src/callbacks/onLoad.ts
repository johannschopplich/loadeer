import { hasNativeLoadingSupport } from '../utils'
import type { LoadeerElement, LoadeerOptions } from '../types'

export function onLoad(
  element: LoadeerElement,
  { useNativeLoading = false }: LoadeerOptions,
) {
  const { src, srcset, sizes, poster } = element.dataset

  if (src) {
    element.src = src
    delete element.dataset.src
  }

  if (element instanceof HTMLVideoElement) {
    if (poster) {
      element.poster = poster
      delete element.dataset.poster
    }
    return
  }

  if (
    element instanceof HTMLImageElement
    && useNativeLoading
    && hasNativeLoadingSupport
    && element.loading !== 'lazy'
  )
    element.loading = 'lazy'

  if (srcset) {
    element.srcset = srcset
    delete element.dataset.srcset
  }

  if (sizes) {
    const width = element instanceof HTMLSourceElement
      ? element.parentElement?.getElementsByTagName('img')[0]?.offsetWidth
      : element.offsetWidth

    element.sizes = sizes === 'auto' ? (width ? `${width}px` : '100vw') : sizes
  }
}
