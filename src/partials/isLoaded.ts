export default ({ dataset }: HTMLElement): boolean =>
  !["src", "srcset"].some((i) => i in dataset);
