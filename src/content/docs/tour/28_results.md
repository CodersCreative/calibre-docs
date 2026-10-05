---
title: Results
description: Representing errors explicitly.
---

Calibre uses result types for error-aware computations.

A result type is written as `Err!Ok`, where the left side is the error type and the right side is the ok type.

```cal
const parse_and_add := fn (txt : str, extra : int) -> str!int => {
  let n := try txt as int;
  return ok(n + extra);
};
```

In `str!int`, `str` is the error type and `int` is the successful value type.

Results are commonly created with `ok(...)` and `err(...)`.

```cal
ok(10);
err("something went wrong");
```

You can inspect results with pattern matching.

```cal
match parse_and_add("50", 7) {
  .Ok : value => print(value),
  .Err : message => print(message)
};
```

Calibre also provides the `try` keyword for working with results more conveniently.

Here, if `txt as int` fails, the error is propagated instead of continuing.

```cal
const parse_and_add := fn (txt : str, extra : int) -> str!int => {
  let n := try txt as int;
  return ok(n + extra);
};
```

`try` can also take a fallback expression with `=>`.

```cal
let number := try "64" as int => 0;
```

In this form, if the result is successful, the success value is produced. If it fails, the expression after `=>` is used instead.

You can also bind the error value with `: name =>`.

In this form, the error is bound to `e` and can be inspected or transformed before choosing what to do next.

```cal
let file := try File.open_read("input.txt") : e => {
  panic(e);
};
```

These forms are all valid:

```cal
let a := try some_result;
let b := try some_result => fallback_value;
let c := try some_result : err_value => fallback_expression;
```

Use plain `try value;` when you want to propagate failure, `try value => ...` when you want a fallback, and `try value : err => ...` when you also need access to the error itself.

Results come with standard helper methods.

```cal
let parsed := parse_and_add("50", 7);

print(parsed.is_ok());
print(parsed.is_err());
```

You can transform results with methods like `.map(...)` and `.map_err(...)`.

```cal
let res1 := ok(7).map(fn (x : int) -> int => return x * 2);
let res2 := err("oops").map_err(fn (e : str) -> str => return "ERR: " & e);
```

Use results when an operation can fail and you want that possibility to be visible in the type system.

## The `as` Operator

The `as` operator performs type conversion and returns a result type. If the conversion succeeds, it returns `Ok : value`. If it fails, it returns `Err : error`.

```cal
let number : str!int = "42" as int;
print(number); // Ok : 42

let invalid : str!int = "not a number" as int;
print(invalid); // Err : "conversion failed"
```

### `as!` - Panic on Failure

The `as!` operator panics if the conversion fails.

```cal
let number := "42" as! int;
print(number); // 42

// panics with conversion error
let invalid := "not a number" as! int;
```

### `as?` - Option on Failure

The `as?` operator returns an option type. If the conversion succeeds, it returns `Some : value`. If it fails, it returns `None`.

```cal
let number : int? = "42" as? int;
print(number); // Some : 42

let invalid : int? = "not a number" as? int;
print(invalid); // None
```

This is useful when you want to attempt a conversion but don't care about the error message—just whether it succeeded.

## Try Forms for Results

Calibre provides several try forms for working with results:

### `try` - Propagate Error

The basic `try` form propagates the error if the result is an error.

```cal
const parse_and_add := fn (txt : str, extra : int) -> str!int => {
  let n := try txt as int;
  return ok(n + extra);
};
```

If `txt as int` fails, the error is propagated immediately from the function.

### `try ... => fallback` - Fallback Value

The `try ... =>` form provides a fallback value if the result is an error.

```cal
let number := try "64" as int => 0;
print(number); // 64 if successful, 0 if failed
```

### `try ... : err => fallback` - Bind Error

The `try ... : err =>` form binds the error value and allows you to inspect it before choosing a fallback.

```cal
let file := try File.open_read("input.txt") : e => {
  print("Failed to open file: " & e);
  panic(e);
};
```

### `try?` - Result to Option

The `try?` form converts a result to an option. If the result is `Ok : value`, it returns `Some : value`. If the result is `Err : ...`, it returns `None`.
If you use `try?` with an option it will do nothing and just return the option.

```cal
let result : str!int = ok(100);
let option : int? = try? result;
print(option); // Some : 100

let error : str!int = err("conversion error");
let option : int? = try? error;
print(option); // None
```

This is useful when you want to handle errors by simply treating them as "no value" without needing the error message.

### `try!` - Option to Result or Transformation

The `try!` form can also be used with results to transform error messages. If the result is `Ok : value`, it returns `Ok : value`. If the result is `Err : old_error`, it returns `Err : new_error` where you can provide a custom error message or transformation.

```cal
let result : str!int = ok(200);
let transformed : int!int = try! result => 404;
print(transformed); // Ok : 200

let error : str!int = err("original error");
let transformed : int!int = try! error => 404;
print(transformed); // Err : 404
```

This is useful when you want to convert error types or provide more context-specific error messages.

The `try!` form also converts an option to a result. If the option is `Some : value`, it returns `Ok : value`. If the option is `None`, it returns `Err : message` where you can provide a custom error message.

```cal
let opt : int? = some(75);
let result : str!int = try! opt => "conversion error";
print(result); // Ok : 75

let empty : int? = none;
let result : str!int = try! empty => "option was none";
print(result); // Err : "option was none"
```

### `try!!` - Unwrap with Panic

The `try!!` form unwraps a result or option, panicking if it's a `Err : ...` or `None`. You can optionally provide a custom panic message.

```cal
let result : str!int = ok(300);
let value : int = try!! result;
print(value); // 300

let error : str!int = err("panic!");
// panics with message "custom panic message"
let value : int = try!! error => "custom panic message";
```

This is useful when you're certain an operation will succeed and want to fail explicitly if your assumption is wrong.

## Summary

- Use `as` for conversions that return results
- Use `as!` when you want to panic on failure
- Use `as?` when you want an option instead of a result
- Use `try` to propagate errors
- Use `try =>` to provide fallback values
- Use `try : err =>` to inspect errors before choosing a fallback
- Use `try?` to convert results to options
- Use `try!` to convert options to results
- Use `try!!` to unwrap and panic on failure
