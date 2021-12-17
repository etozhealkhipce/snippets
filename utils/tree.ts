/**
const expected =
			'   *   \n' +
			'  ***  \n' +
			' ***** \n' +
			'*******\n' +
			'   |   \n';
assert.strictEqual(tree(5), expected);
assert.strictEqual(tree('5'), expected);
*/

type Nullable<T> = T | null;

const TYPE_ERROR = "Something wrong with type of input param";

const tree = (lvl: number | string): Nullable<string> => {
  if (typeof lvl !== "number" && typeof lvl !== "string") {
    throw new TypeError(TYPE_ERROR);
  }

  if (lvl < 3) return null;

  let tree = [];

  for (let i = 1; i <= +lvl; i++) {
    tree[i - 1] = [];

    if (i < +lvl) {
      for (let j = i + 1; j < +lvl; j++) {
        tree[i - 1].push(" ");
      }
    } else {
      for (let j = 2; j < +lvl; j++) {
        tree[i - 1].push(" ");
      }
    }

    if (i < +lvl) {
      for (let j = 1; j <= 2 * i - 1; j++) {
        tree[i - 1].push("*");
      }
    } else {
      tree[i - 1].push("|");
    }
  }

  return tree
    .map((e) => {
      const idx = e.indexOf("*") === -1 ? e.indexOf("|") : e.indexOf("*");

      if (idx !== -1) {
        for (let i = 0; i <= idx; i++) {
          if (i === idx) {
            e.push("\n");
          } else {
            e.push(" ");
          }
        }
      }

      return e.join("");
    })
    .join("");
};

console.log(tree(50));
