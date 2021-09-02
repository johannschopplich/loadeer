import { isString, toArray } from "@antfu/utils";
import type { LoadeerInput } from "../types";

export default function <T extends Element>(
  input: LoadeerInput<T>,
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
