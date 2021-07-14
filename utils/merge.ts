type Indexed<T = unknown> = {
  [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (var p in rhs) {
    try {
      if ((rhs[p] as object).constructor === Object) {
        lhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export default merge;

console.log(merge({ a: { b: { a: 2 } }, d: 5 }, { a: { b: { c: 1 } } }));
/*
  {
      a: {
          b: {
              a: 2,
              c: 1,
          }
      },
      d: 5,
  }
  */
