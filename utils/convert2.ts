const TYPE_ERROR = "Unsupported input value type";
const RANGE_ERROR = "Input value must be [1; 3999]";
const UNKNOWN_SYMBOLS = "Unknown input symbols";

const REG_DIGITS = /^-?\d+$/;
const REG_ROMANS = /^[IVXLCDM]+$/i;
const REG_AVAILABLE_ROMANS =
  /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/i;
const REG_COMBINATIONS_ROMANS = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g;

const ROMANS_MAP: Record<string, number> = {
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

const roman = (number: number | string): number | string => {
  switch (typeof number) {
    case "string":
      if (REG_DIGITS.test(number)) {
        return romanize(+number);
      }

      if (REG_ROMANS.test(number)) {
        return deromanize(number);
      }

      throw new Error(UNKNOWN_SYMBOLS);

    case "number":
      if (number < 1 || number > 3999) {
        throw new Error(RANGE_ERROR);
      }

      if (REG_DIGITS.test(number.toString())) {
        return romanize(number);
      }

      throw new Error(UNKNOWN_SYMBOLS);

    default:
      throw new Error(TYPE_ERROR);
  }
};

export default roman;

function romanize(num: number): string {
  let roman = "";
  for (let i in ROMANS_MAP) {
    if (!ROMANS_MAP.hasOwnProperty(i)) {
      continue;
    }

    while (num >= ROMANS_MAP[i]) {
      roman += i;
      num -= ROMANS_MAP[i];
    }
  }
  return roman;
}

function deromanize(roman: string): number {
  const upperRoman = roman.toUpperCase();

  if (+upperRoman < 1) {
    return 0;
  } else if (!REG_AVAILABLE_ROMANS.test(upperRoman)) {
    return NaN;
  }

  let num = 0;
  upperRoman.replace(REG_COMBINATIONS_ROMANS, (i) => {
    num += ROMANS_MAP[i];
    return "";
  });
  return num;
}
