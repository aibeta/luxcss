export function sortString(array: string[]): string[] {
  return array.sort((a, b) => a.localeCompare(b));
}

export function sort(array: number[]): number[] {
  return array.sort((a, b) => a - b);
}

export function padZero(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}

export function isNumber(value: string): boolean {
  return /^-?\d$/.test(value);
}

export function hms(): string {
  const date = new Date();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();

  return `${padZero(h)}:${padZero(m)}:${padZero(s)}`;
}

// Elements that exist in list1 but not in list2.
export function diffDecreaseList<T>(list1: T[] = [], list2: T[] = []): T[] {
  return list1.filter((item) => !list2.includes(item));
}

export default {
  sortString,
  sort,
  isNumber,
  hms,
  diffDecreaseList,
};
