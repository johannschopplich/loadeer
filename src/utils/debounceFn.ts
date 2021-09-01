// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function <T extends (...args: any[]) => any>(
  callback: T,
  delay = 250
): (...args: Parameters<T>) => void {
  let timeoutId: number | null;

  return (...args: Parameters<T>): void => {
    timeoutId && clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      callback(...args);
    }, delay);
  };
}
