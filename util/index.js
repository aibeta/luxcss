function sortString(array) {
  return array.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0; // default return value (no sorting)
  });
}
function sort(array) {
  return array.sort((a, b) => a - b);
}

function padZero(v) {
  return v < 10 ? `0${v}` : v;
}

function hms() {
  const date = new Date();
  let h = date.getHours();
  h = padZero(h);
  let m = date.getMinutes();
  m = padZero(m);
  let s = date.getSeconds();
  s = padZero(s);

  return `${h}:${m}:${s}`;
}

// list1 中有的元素，list2中没有的元素
function diffDecreaseList(list1 = [], list2 = []) {
  const decreaseList = [];

  list1.forEach((d) => {
    const index = list2.indexOf(d);
    if (index < 0) decreaseList.push(d);
  });

  return decreaseList;
}

module.exports = {
  sortString,
  sort,
  hms,
  diffDecreaseList,
};
