export default function ({ dataset }: HTMLElement): boolean {
  return !["src", "srcset"].some((i) => i in dataset);
}
