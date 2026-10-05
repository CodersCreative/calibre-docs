---
title: Floats and Big
description: Decimal numbers.
---

Calibre uses `float` or `big` for decimal numbers.

```cal
let x : float = 3.14;
let y := 2.5;
let z : big = 2.5g;
```

You can also write an explicit float literal with the `f` suffix or an explicit big float with the `g` suffix.

```cal
let x := 10f;
let y := 0.5f;
let z := 0.75g;
```

Floats and Bigs are useful when you need fractions, measurements, or calculations that should not be rounded to whole numbers.

```cal
const bmi := fn (mass height : float) -> float => return mass / height ** 2;
```

Like integers, floats and bigs can use `e` for powers of ten.

```cal
let small := 1.5e-2;
let large := 2e6f;
let xlarge := 2e46g;
```

Float values work with the usual arithmetic operators.

```cal
const main = fn => {
  let a := 7.5;
  let b := 2f;

  print(a + b);
  print(a - b);
  print(a * b);
  print(a / b);

  let c := 75000000g;
  let d := 20000000g;

  print(c + d);
  print(c - d);
  print(c * d);
  print(c / d);
};
```

The standard library also provides helper functions on `float` and `big`, such as `float.sqrt(9f)`, `(3.5).round()`, and `float.sin(PI / 4f)`.
