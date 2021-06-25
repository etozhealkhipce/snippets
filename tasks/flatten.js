function flatten(list) {
  if (list.some((item) => Array.isArray(item))) {
    let result = [];

    for (let i = 0; i < list.length; i++) {
      if (Array.isArray(list[i])) {
        result.push(...list[i]);
      } else {
        result.push(list[i]);
      }
    }

    return flatten(result);
  } else {
    return list;
  }
}

flatten([
  1,
  "any [complex] string",
  null,
  function () {},
  [1, 2, [3, "4"], 0],
  [],
  { a: 1 },
]);
