type StringIndexed = Record<string, any>;

type PlainObject<T = unknown> = {
  [k in string]: T;
};

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

const obj: StringIndexed = {
  key: 1,
  key2: "test",
  key3: false,
  key4: true,
  key5: [1, 2, 3],
  key6: { a: 1 },
  key7: { b: { d: 2 } },
};

function queryStringify(data: StringIndexed, urlEncode?: any) {
  function normalizeObj(obj: any, path: any[] = []): any[] {
    const result: any[] = [];

    Object.keys(obj).forEach(function (key) {
      if (!obj.hasOwnProperty(key)) return;

      const newPath = path.slice();
      newPath.push(key);
      let values: any[] = [];

      if (isPlainObject(obj[key])) {
        values = normalizeObj(obj[key], newPath);
      } else if (isArray(obj[key])) {
        values = normalizeObj(obj[key], newPath);
      } else {
        values.push({ path: newPath, val: obj[key] });
      }

      values.forEach(function (data) {
        return result.push(data);
      });
    });

    return result;
  }

  let result = normalizeObj(data);

  result = result.map((val) => {
    if (val.path.length == 1) val.path = val.path[0];
    else {
      const first = val.path[0];
      const rest = val.path.slice(1);
      val.path = first + "[" + rest.join("][") + "]";
    }
    return val;
  });

  const queryString = result
    .map((val) => {
      return val.path + "=" + val.val;
    })
    .join("&");

  if (urlEncode) return encodeURIComponent(queryString);
  else return queryString;
}

export default queryStringify;

console.log(queryStringify(obj));

// 'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2'
// 'key=1&key2=test&key3=false&key4=true&key5=1,2,3&key6[a]=1&key7[b][d]=2'
// key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2
