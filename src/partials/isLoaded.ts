export default (element: HTMLElement): boolean =>
  "src" in element.dataset || "srcset" in element.dataset;
