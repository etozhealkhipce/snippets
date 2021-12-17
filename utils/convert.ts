const TYPE_ERROR = "Unsupported input value type";
const RANGE_ERROR = "Input value must be [1; 3999]";
const UNKNOWN_SYMBOLS = "Unknown input symbols";

const romanToNumberDict = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

const numberToRomanDict = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

function numberToRoman(number: number): string {
  let result: string = "";

  for (let i in numberToRomanDict) {
    if (!numberToRomanDict.hasOwnProperty(i)) {
      continue;
    }

    while (number >= numberToRomanDict[i]) {
      result += i;
      number -= numberToRomanDict[i];
    }
  }

  return result;
}

function romanToNumber(number: string): number {
  let result: number = 0;

  for (let i = 0; i < number.length; i++) {
    const cur = romanToNumberDict[number[i]];
    const next = romanToNumberDict[number[i + 1]];

    if (cur < next) {
      result += next - cur;
      i++;
    } else {
      result += cur;
    }
  }

  return result;
}

const roman = (number: number | string): number | string => {
  switch (typeof number) {
    case "string":
      if (
        number === "null" ||
        number === "undefined" ||
        number === "{}" ||
        number === "true"
      ) {
        throw new Error(TYPE_ERROR);
      }

      if (!number) {
        return NaN;
      }

      if (
        !isNaN(Number(number)) &&
        Number(number) < 3999 &&
        Number(number) > 1
      ) {
        if (Number(number) % 1 !== 0) {
          throw new Error(UNKNOWN_SYMBOLS);
        }

        if (Number(number) > 3999 || Number(number) < 1) {
          throw new Error(RANGE_ERROR);
        }

        return numberToRoman(+number);
      }

      if (
        number
          .split("")
          .every((n) =>
            Object.keys(romanToNumberDict).includes(n.toUpperCase())
          )
      ) {
        return romanToNumber(number);
      }

      throw new Error(UNKNOWN_SYMBOLS);

    case "number":
      if (number % 1 !== 0) {
        throw new Error(UNKNOWN_SYMBOLS);
      }

      if (number > 3999 || number < 1) {
        throw new Error(RANGE_ERROR);
      }

      if (!isNaN(Number(number))) {
        return numberToRoman(number);
      }

      throw new Error(UNKNOWN_SYMBOLS);

    default:
      throw new Error(TYPE_ERROR);
  }
};

try {
  console.log(roman("4.78"));
} catch (error) {
  console.log(error);
}
