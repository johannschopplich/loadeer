export function isLoaded({ dataset }: HTMLElement) {
  return !['src', 'srcset'].some(i => i in dataset)
}
