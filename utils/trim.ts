const trim = (value: string, symbols: string = ""): string =>
  value.replace(
    new RegExp(
      `^[\\s${symbols === " " ? "" : symbols}]+|[\\s${
        symbols === " " ? "" : symbols
      }]+$`,
      "gi"
    ),
    ""
  );

trim("  abc  "); // => 'abc'
trim("-_-abc-_-", "_-"); // => 'abc'
trim("\xA0foo"); // 'foo'
trim("\xA0foo", " "); // ' foo'
trim("-_-ab c -_-", "_-"); // ab c

["  foo  ", "  bar  "].map((value) => trim(value)); // => ['foo', 'bar']
