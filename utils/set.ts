type Indexed<T = unknown> = {
  [key in string]: T;
};

function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown | any {
  if (path.constructor !== String) {
    throw new Error("path must be string");
  }

  if ((object as object).constructor !== Object) {
    return object;
  }

  let splitPath = path.split(".");

  for (let i = 0; i <= splitPath.length - 1; i++) {
    const path = splitPath.length ? splitPath.slice(i + 1).join(".") : null;
    if (path) {
      const buffer = {};
      (object as object)[splitPath[i]] = set(buffer, path, value);
    } else {
      (object as object)[splitPath[i]] = value;
    }

    return object;
  }
}

export default set;

console.log(set({ foo: 5 }, "bar.baz", 10));

/**
 * set({ foo: 5 }, 'bar.baz', 10); // { foo: 5, bar: { baz: 10 } }
 * set(3, 'foo.bar', 'baz'); // 3
 */
