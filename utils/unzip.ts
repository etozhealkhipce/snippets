/**
 * unzip([1, 2, 3], [4], [5, 6]); // => [[1, 4, 5], [2, undefined, 6], [3, undefined, undefined]]
 * unzip([1, 2, 3]); // => [[1], [2], [3]]
 * unzip([1], [1, 2, 3], [4, 6, 7, 8, 9]); // => [[1, 1, 4], [undefined, 2, 6], [undefined, 3, 7], [undefined, undefined, 8], [undefined, undefined, 9]]
 * unzip({}); // => Error: [object Object] is not array
 */

//   Math.max(...result.map(arr => arr.length));

function unzip(...args: any[]): any[] | void {
  let arr = [];
  let max = 0;

  args.forEach((arg) => {
    if (!Array.isArray(arg)) {
      throw Error(`${arg} is not array`);
    }

    if (arg.length > max) {
      max = arg.length;
    }
  });

  for (let i = 0; i < max; i++) {
    for (let j = 0; j < args.length; j++) {
      let res = undefined;
      if (!arr[i]) arr[i] = [];
      if (args[j] && args[j][i]) res = args[j][i];
      arr[i][j] = res;
    }
  }

  return arr;
}

// console.log(unzip([1, 2, 3], [4], [5, 6])); // => [[1, 4, 5], [2, undefined, 6], [3, undefined, undefined]]
// console.log(unzip([1, 2, 3])); // => [[1], [2], [3]]
// console.log(unzip([1], [1, 2, 3], [4, 6, 7, 8, 9])); // => [[1, 1, 4], [undefined, 2, 6], [undefined, 3, 7], [undefined, undefined, 8], [undefined, undefined, 9]]
console.log(unzip({})); // => Error: [object Object] is not array
