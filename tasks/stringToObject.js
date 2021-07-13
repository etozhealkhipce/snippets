function get(obj, path, defaultValue) {
  const newPath = path.split(".");
  let newObj = { ...obj };

  for (i = 0; i < newPath.length; i++) {
    if (!!newObj) {
      newObj = newObj[newPath[i]];
    }
  }

  if (newObj) {
    return newObj;
  } else if (defaultValue) {
    return defaultValue;
  }
}

const obj = {
  a: {
    b: {
      c: "d",
    },
    e: "f",
  },
};

get(obj, "a.b"); // { c : 'd' }
get(obj, "a.b.c"); // 'd'
get(obj, "a.e"); // 'f'
get(obj, "a.x.e"); // undefined
get(obj, "a.x.e", true); // true
get(obj, "a.x.e", "My default value"); // My default value
