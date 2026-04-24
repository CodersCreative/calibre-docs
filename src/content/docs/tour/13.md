---
title: List Comprehensions
description: Building lists from loops.
---

List comprehensions let you build a list from a compact loop-like expression.

This creates a new list by evaluating the expression on the left for each value produced by the loop on the right.

```cal
let squares := [n * n for n in 0..5];
```

You can also filter values with `if`.

```cal
let evens := [n for n in 0..10 if n % 2 = 0];
```

Multiple conditions can be chained.

```cal
let values := [n ** 2 for n in 0..20 if n % 2 = 0 if n % 4 != 0];
```

List comprehensions can also use `until` to stop once a condition becomes true.

This is useful when you want the comprehension to end early allowing for easy truncation of values.

```cal
let values := [10 for i in 10 until i > 4];
```

If you want an explicit list type, you can write it in front of the comprehension.

```cal
let items := list:<int>[n + 1 for n in 0..5];
```

List comprehensions are useful when you want to transform or filter data while producing a list directly.
