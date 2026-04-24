---
title: Generators
description: Lazily producing values one at a time.
---

Calibre uses `gen:<T>` for generators.

A generator can yield values over time instead of building a whole list at once. Allowing for potentially infinite series to be represented

Note that all generator functions must have an explicit return type of `gen:<T>`

```cal
const count_up := fn (start : int, end : int) -> gen:<int> => {
  let mut i := start;

  for i < end => {
    if i % 2 = 0 => return i; // Note that return basically acts as the yield keyword in other languages.
    i += 1;
  };
};
```

Inside a generator function, `return value;` produces the next generated item. A plain `return;` or the end of the function scope ends the generator.

You can pull values from a generator with `.next()` as they inherent the Iter trait.

```cal
let mut g := count_up(0, 10);

print(g.next());
print(g.next());
print(g.next());
```

You can also iterate through generator results in a loop.

```cal
let mut g := count_up(0, 10);
for let .Some : value <- g.next() => print(value);
```

Generators are useful when values should be computed lazily, or when you want to represent a sequence without allocating the whole result up front.
