function objectHandler(obj: Record<string, any>) {
  let arr = [];

  Object.keys(obj).forEach((key) => {
    if (obj[key] === true) {
      arr.push(key);
    }
  });

  return arr.join(" ");
}

function validator(value: unknown) {
  if (value === 0) return false;

  if (typeof value === "object" && value !== null) {
    return objectHandler(value);
  }

  return value;
}

function classNames(...args) {
  //   const args = Array.prototype.slice.call(arguments);

  let classnames = [];

  args.forEach((arg) => {
    if (!arg) return;

    if (Array.isArray(arg)) {
      const arr = arg.reduce((acc, val) => acc.concat(val), []);

      arr.forEach((el) => {
        if (validator(el)) {
          classnames.push(el);
        }
      });
    }

    if (typeof arg === "object" && arg !== null) {
      classnames.push(objectHandler(arg));
    }

    if (typeof arg === "string" || typeof arg === "number") {
      classnames.push(arg);
    }
  });

  return classnames.filter((el) => !!el).join(" ");
}

console.log(classNames("foo", "bar")); // => 'foo bar'
console.log(classNames("foo", { bar: true })); // => 'foo bar'
console.log(classNames({ "foo-bar": true })); // => 'foo-bar'
console.log(classNames({ "foo-bar": false })); // => ''
console.log(classNames({ foo: true }, { bar: true })); // => 'foo bar'
console.log(classNames({ foo: true, bar: true })); // => 'foo bar'
console.log(
  classNames("foo", { bar: true, duck: false }, "baz", { quux: true })
); // => 'foo bar baz quux'
console.log(classNames(null, false, "bar", undefined, 0, 1, { baz: null }, "")); // => 'bar 1'
console.log(classNames("bar", [1, null, "baz"], { baz: true }, "3")); // => 'bar 1 baz baz 3'
console.log(
  classNames("bar", [1, null, "baz", ["foo", "test"]], { baz: true }, "3")
); // => 'bar 1 baz foo test baz 3'
