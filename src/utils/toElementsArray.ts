import type { LoadeerInput } from "../types";

export default function <T extends HTMLElement>(
  input: LoadeerInput<T>,
  root: Element | Document = document
): T[] {
  if (typeof input === "string") {
    return [...root.querySelectorAll<T>(input)];
  }

  if (input instanceof Element) {
    return [input];
  }

  return [...input];
}
