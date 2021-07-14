function isEqualArray(a: any[], b: any[]) {
  if (a.length !== b.length) return false;

  for (var i = 0, l = a.length; i < l; i++) {
    if (a[i] instanceof Array && b[i] instanceof Array) {
      if (!isEqualArray(a[i], b[i])) return false;
    } else if (a[i] != b[i]) {
      return false;
    }
  }
  return true;
}

function isEqual(a: object, b: object): boolean {
  if (Object.keys(a).length !== Object.keys(b).length) return false;

  for (var value in a) {
    if (b.hasOwnProperty(value)) {
      const lhs = (a as any)[value];
      const rhs = (b as any)[value];

      if (
        lhs &&
        rhs &&
        lhs.constructor === Object &&
        rhs.constructor === Object
      ) {
        return isEqual(lhs, rhs);
      } else {
        if (lhs instanceof Array && rhs instanceof Array) {
          return isEqualArray(lhs, rhs);
        }

        if (lhs === rhs) {
          return true;
        }

        return false;
      }
    } else {
      return false;
    }
  }

  return true;
}

export default isEqual;

const a = {
  a: {
    z: {
      biba: ["12"],
    },
  },
};
const b = {
  a: {
    z: {
      biba: ["12"],
    },
  },
};
console.log(isEqual(a, b));
