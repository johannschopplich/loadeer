export default ({ dataset }: { dataset: DOMStringMap }): boolean =>
  !["src", "srcset"].some((i) => i in dataset);
