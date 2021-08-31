import { isString } from "@antfu/utils";

export default function <T extends Element>(
  selector: string | T | Array<T> | NodeListOf<T>,
  root: Element | Document = document
): Array<T> {
  if (isString(selector)) {
    return [...root.querySelectorAll<T>(selector)];
  }

  if (selector instanceof Element) {
    return [selector];
  }

  return [...selector];
}
