/**
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */

function queryStringify(data: object): string {
  const params = (<any>Object)
    .entries(data)
    .reduce(
      (acc: string, [key, value]: (string | any)[], index: number) =>
        acc + (index ? `&${key}=${value}` : `${key}=${value}`),
      "?"
    );
  return params;
}

console.log(queryStringify({ a: 1, b: 2, c: { d: 123 }, k: [1, 2, 3] }));
