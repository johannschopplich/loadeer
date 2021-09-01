import { isString, toArray } from "@antfu/utils";
import type { Arrayable } from "@antfu/utils";

export default function <T extends Element>(
  input: string | Arrayable<T> | NodeListOf<T>,
  root: Element | Document = document
): Array<T> {
  if (isString(input)) {
    return [...root.querySelectorAll<T>(input)];
  }

  if (input instanceof NodeList) {
    return [...input];
  }

  return toArray(input);
}
