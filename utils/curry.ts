type StepFn = (val: number) => number | StepFn;

function add(val?: number): number | StepFn | any {
  let num: number = 0;

  function sum(val2?: number): any {
    num += val2 ? val2 : 0;
    return val2 !== undefined ? sum.bind(this) : num;
  }

  return sum(val);
}

console.log(add()); // => 0
console.log(add(1)(2)()); // => 3
console.log(add(1)(5)(4)(3)(0)()); // => 13
console.log(add(1)()); // => 1
