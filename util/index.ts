export function sortString(array: []) {
  return array.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0; // default return value (no sorting)
  });
}
export function sort(array: []) {
  return array.sort((a, b) => a - b);
}

export function padZero(v: number): string {
  return v < 10 ? `0${v}` : `{v}`;
}

export function isNumber(v: string) {
  // @ts-ignore
  if (0 + v == Number(v)) return true;
  return false;
}

export function hms() {
  const date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  return `${padZero(h)}:${padZero(m)}:${padZero(s)}`;
}

// list1 中有的元素，list2中没有的元素
export function diffDecreaseList(list1 = [], list2 = []) {
  const decreaseList: any[] = [];

  list1.forEach((d) => {
    const index = list2.indexOf(d);
    if (index < 0) decreaseList.push(d);
  });

  return decreaseList;
}

export default {
  sortString,
  sort,
  isNumber,
  hms,
  diffDecreaseList,
};
