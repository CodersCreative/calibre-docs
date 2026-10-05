---
title: Builtin Operators
description: Core operators like `in`, ternary, `**`, and logical operators.
---

Calibre has several built-in operators that show up throughout the language.

The `in` operator checks membership.

```cal
if 4 in [4, 16, 32] => print("found");
```

You will also see `in` used in patterns and overloaded forms.

```cal
let classify := fn match int -> str {
  in 0..20 => return "in-range",
  in [30, 40, 50] => return "in-list",
  _ => return "other"
};
```

Exponentiation uses `**`.

```cal
let squared := 5 ** 2;
let root := 9 ** 0.5;
```

Logical `and` and `or` use `&&` and `||` respectively.

These operators often appear together with comparisons and boolean conditions.

```cal
if age >= 18 && has_ticket => print("allowed");
if x < 0 || y < 0 => print("negative found");
```

Calibre also supports operator overloading for some of these forms, but even without overloading they are part of the everyday surface of the language and are used heavily in conditions, comprehensions, and pattern matching.

## Ternary Operators

Calibre supports three types of ternary operators for different use cases.

### Normal Ternary

The normal ternary has the form `when_true if condition else when_false`.

This is useful for short conditional expressions.

```cal
let label := "yes" if 10 > 5 else "no";
print(label);
```

### Option Ternary

The option ternary uses `if?` and returns an option type. If the condition is true, it returns `some(value)`. If false, it returns `none`.

```cal
let option_int := 42 if? true;
print(option_int); // Some : 42

let option_int := 42 if? false;
print(option_int); // None
```

This is equivalent to:

```cal
let option_int := if true => some(42) else => none;
```

### Result Ternary

The result ternary uses `if!` and returns a result type. If the condition is true, it returns `ok(value)`. If false, it returns `err(fallback)`.

```cal
let result_text := "ready" if! true else "not ready";
print(result_text); // Ok : "ready"

let result_text := "ready" if! false else "not ready";
print(result_text); // Err : "not ready"
```

This is equivalent to:

```cal
let result_text := if true => ok("ready") else => err("not ready");
```

### Left-Hand Side Ternary

Ternary operators can also be used on the left-hand side of assignments for conditional assignment.

```cal
let mut left := 0;
let mut right := 0;
left if true else right := 10;
print(left); // 10
print(right); // 0

left if false else right := 20;
print(left); // 10
print(right); // 20
```

This can be combined with option ternary for conditional assignment:

```cal
let mut value := 0;
value if? true := 10;
print(value); // 10

value if? false := 20;
print(value); // 10
```