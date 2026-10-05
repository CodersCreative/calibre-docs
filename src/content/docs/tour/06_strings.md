---
title: Strings
description: Text values.
---

Calibre uses `str` for text.

## String Literals

String literals are written with double quotes.

```cal
let greeting : str = "Hello";
let message := "Welcome to Calibre";
```

## String Concatenation

You can join strings and other values with `&` (most primitive types would act as you expect).

```cal
let user := "Ada";
let age := 32;

print("Hello " & user);
print("Age: " & age);
```

## String Methods

Strings come with useful standard library methods.

```cal
let text := "a,b,c";

print(text.split(","));
print(text.replace("b", "B"));
print(text.starts_with("a"));
```

## Working with Characters

If you need to work with characters directly, you can index into a string or convert it to a `list:<char>`.

```cal
let chars : list:<char> = "hello" as! list:<char>;

// The generator associated with str is gen:<char> not gen:<str> so this code is perfectly valid
let chars : list:<char> = "hello" as! gen:<char>.collect();
```

## Template Strings

Calibre also supports template-style function calls for building strings.

```cal
// Note that your inputs will all be `as!` converted to T in list:<T>
// allowing you to only accept certain types in your template functions
const custom_fmt := fn (splits : list:<str>, inputs : list:<str>) -> str => {
  let mut txt : str = "";

  for i in len(splits) => {
    txt &= try!! splits[i];
    if i < len(inputs) => txt &= try!! inputs[i];
  };

  return txt;
}

const main := fn => {
  // Note that brackets can be escaped using `{{` and `}}` and that
  // within the `{}` any valid calibre statement is allowed
  let mut formatted := "Hello, my name is {"Ada"} and I am {32}";
  print(formatted);

  // A similar `fmt` method is included as part of the stdlib
  formatted := fmt"Hello, my name is {"Ada"} and I am {32}";
  print(formatted);
}
```

You will use strings often for input, output, file paths, parsing, and user-facing messages.
