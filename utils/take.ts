class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

function take(list: number[], num: number = 1): number[] {
  if (!Array.isArray(list) || typeof num !== "number") {
    throw new ValidationError("bad value");
  }

  return list.slice(0, num);
}

// const testErrCase1 = [123, [1, 2, 3], [1, 2, 3], [1, 2, 3]];
// const testErrCase2 = [1, [1], "1", true];

// for (let i = 0; i < 4; i++) {
//   try {
//     take(testErrCase1[i], testErrCase2[i]);
//   } catch (err) {
//     console.log(err.toString()); // ValidationError: bad value
//   }
// }

// try {
//   console.log(take([1, 2, 3])); // => [1]
//   console.log(take([1, 2, 3], 2)); // => [1, 2]
//   console.log(take([1, 2, 3], 5)); // => [1, 2, 3]
//   console.log(take([1, 2, 3], 0)); // => []
// } catch (err) {
//   console.log(err.toString());
// }
