---
title: Functions
description: Functions are values in Calibre.
---

In Calibre, functions are values.

That means you can store them in variables, pass them around, and call them later just like other values.

Note that if you have function with multiple adjacent parameters having the same type that the comma between them can be removed and only one type annotation will be required.

```cal
const add := fn (a b : int) -> int => return a + b;

let op := add;
print(op(2, 3));
```

## Anonymous Functions

Functions are also all anonymous. You create a function with `fn`, and if you want to reuse it, you bind it to a name.

```cal
let double := fn (x : int) -> int => return x * 2;
print(double(10));
```

## Function Types

Function types are written with `fn (...) -> ...` or `fn -> ...`.

```cal
const add : fn (int, int) -> int = fn (a b : int) -> int => return a + b;

// Note that the parameter brackets aren't required if there are no parameters
const add_2_5 : fn -> int = fn => return add(2, 5);
```

This is useful when you want to describe the shape of a function value explicitly.

## Inline Functions

You can define functions inline wherever they are needed.

```cal
print((fn (x : int) -> int => return x + 1)(9));
```
Because functions are values, they work naturally with other features like list operations and generators.

```cal
let mapped := list:<int>[1, 2, 3] as! gen:<int>.map(fn (x : int) -> int => return x * 10).collect();
print(mapped);
```

## Default Parameters

Calibre also allows for default parameters.

It unifies function parameter fallback values with the builtin option type syntax. The rule is that the `?` symbol in a function type signature means that "this argument can be left empty."

Assigning an explicit constant directly to a parameter allows it to be omitted at the call site. The compiler injects the literal value.

```calibre
const setup_buffer := fn(size : int = 1024, layout : int) => {
    // `size` is internally treated strictly as an `int`
};

setup_buffer(layout: 2); // gets lowered to setup_buffer(1024, 2)
```

If a parameter uses  `?` without an explicit assignment, omitting it automatically injects `none`.

```calibre
const process_user := fn(name : str, flags : uint?) => {
    // `flags` remains an uint?
};

process_user("Ada"); // gets lowered to process_user("Ada", none)
```

You can pass `none` positionally to trigger the default fallback.

```calibre
setup_buffer(none, 3); // gets lowered to setup_buffer(1024, 3)
```

When calling a function that expects an optional (`T?`), providing a raw value automatically wraps it in `some()` at the call site, eliminating the boilerplate of explicit `some()` calls.

```calibre
process_user("Ada", 5u); // gets lowered to process_user("Ada", some(5u))
```

## Currying

Calibre provides the `curry` keyword to automatically transform multi-argument functions into curried form. Currying converts a function like `fn (a, b, c) -> T` into a series of single-argument functions like `fn (a) -> fn (b) -> fn (c) -> T`.

Also note that the `curry` keyword will maintain your default params.

You can use `curry` before a function reference to automatically generate its curried version:

```cal
const add3 := fn (a b c : int) -> int => return a + b + c;

let add_curried := curry add3;
print(add_curried(10)(20)(30)); // 60
```

### Type Annotations with Curry

You can also use `curry` in type annotations to help type curry-like functions:

```cal
const add_curried : curry int -> int -> int -> int = curry add3;
print(add_curried(10)(20)(30)); // 60
```

### Combining Curried Functions

Curried functions compose naturally, allowing you to build complex operations from simpler ones:

```cal
const mul2 := fn (a b : int) -> int => return a * b;

let add_curried := curry add3;
print(add_curried(10)(20)((curry mul2)(5)(6))); // 10 + 20 + (5 * 6) = 60
```

### Currying Values

You can also curry non-function values to create a function that returns that value:

```cal
const TEN := 10;

let ten := curry TEN;
print(ten()); // 10
```

Currying is useful for function composition, partial application, and creating more flexible and reusable function abstractions.