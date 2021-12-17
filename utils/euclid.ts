// euclid(6006, 3738735, 51051) --> 3003
// euclid(7) --> 7
// euclid(-421, 0.9923501, 3.1401525235324, -228.148832269) --> -1

/**
 * counts greatest common divisor for n numbers
 * by calling 'euclidForTwo' in cycle for all input params
 * @param {array} ...args contains numbers to check
 * @returns {number} solution or '-1' in case of invalid data
 */

//  const gcd = (first: number, second: number): number => {
//   let temp: number;
//   while (second > 0) {
//     temp = second;
//     second = first % second;
//     first = temp;
//   }
//   return first;
// };

// const isInvalid = (num: unknown): boolean =>
//   !(typeof num === "number" && num >= 0 && Number.isInteger(num));

// const euclid = (...args: number[]): number => {
//   if (args.some(isInvalid)) {
//     return -1;
//   }
//   let result = args[0];
//   for (let i = 1; i < args.length; i++) {
//     result = gcd(result, args[i]);
//   }
//   return result;
// };

// export default euclid;

function gcd(a: number, b: number): number {
  if (a == 0) return b;

  return gcd(b % a, a);
}

const euclid = (...args: number[]): number => {
  const arr = args;
  let result = arr[0];
  for (let i = 1; i < args.length; i++) {
    result = gcd(arr[i], result);

    if (result == 1) {
      return 1;
    }
  }
  return result;
};
