---
title: Integers
description: Whole numbers.
---

Calibre has built-in integer types to represent whole numbers.

The default integer type is `int` to represent signed 64bit integers.

```cal
let x := 10;
let y : int = 25;
```

You can also write an explicit integer literal with the `i` suffix.

```cal
let x := 10i;
```

For unsigned integers, use `uint` and the `u` suffix.

```cal
let count : uint = 10u;
```

There is also a `byte` literal form with the `b` suffix.

```cal
let cell : byte = 0b;
```

Use of suffixes to describe integer literals.

```cal
let normal := 42; // Defaults to using int
let signed := 42i;
let unsigned := 42u;
let byte_value := 42b;
```

Underscores can make larger integer literals easier to read.

```cal
let users := 1_000_000;
```

Special prefixes let you write integers in other bases.

These are useful when working with bit patterns, flags, binary data, or values commonly written in hexadecimal.

```cal
let hex := 0xFF;
let octal := 0o77;
let binary := 0b1010;
```

You can also use `e` to write powers of ten with integers.

This is useful when a value is easier to read as a scaled decimal number.

```cal
let thousand := 1e3;
let big := 25e4;
```

Integer values work with the usual arithmetic operators.

```cal
const main = fn => {
  let a := 10;
  let b := 3;

  print(a + b);
  print(a - b);
  print(a * b);
  print(a % b);
};
```

Calibre also includes integer ranges, which are useful in loops.

```cal
for i in 0..5 => print(i);
```

You will also see integer helper functions on `int`, `uint`, `range` and `byte`, such as `int.gcd(84, 18)` or `84.max(18)` all included in the stdlib.
