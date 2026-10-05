---
title: Pipes and Reverse Args
description: Feeding values into calls.
---

Calibre supports pipes, which let you pass a value into the next expression.

```cal
200 |> fn (s : dyn) => print("pipe closure => " & s);
```

The value on the left of `|>` is fed into the expression on the right.

This is often easier to read than deeply nested function calls, especially when several steps happen in sequence.

You can also build up calls step by step.

```cal
const mul3 := fn (a b c : int) -> int => return a * b * c;

print(5 |> mul3(3, 4, $));
```

The `$` is used to reference the result of the previous pipe segement, in the following case that result is a function therefore `$` can be used to directly call that function.

Named piped segments give the piped value a temporary name inside the next stage other than the generic `$`.

```cal
40 |: forty > fn (x : int) => print(forty + x);
```

Reverse arguments are another way to feed values into a call from the right side.
This is especially useful when using template functions allowing you to include extra data other than that from the string.

```cal
const intro := fn (splits : list:<str>, inputs : list:<str>, extra : bool, extra2 : int) => {
  print(splits);
  print(inputs);
  print(extra);
  print(extra2);
};

intro"Hello {name}" <(true, 10);
```
