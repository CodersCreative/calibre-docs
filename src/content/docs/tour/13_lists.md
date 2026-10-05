---
title: Lists
description: Ordered collections of values.
---

Calibre uses `list:<T>` for ordered collections.

## Creating Lists

```cal
let numbers : list:<int> = list:<int>[1, 2, 3];
// The type list:<str> will be inferred from the values in the list
let words := ["alpha", "beta", "gamma"];
```

## Indexing

Lists can be indexed with `[]`.

```cal
let numbers := [10, 20, 30];

// Note that indexing returns an optional value
print(numbers[0]); // Some : 10
print(numbers[1]); // Some : 20
```

## Helper Functions

The standard library provides many useful list methods.

```cal
let mut numbers := list:<int>[1, 2, 3];
numbers <<= 4;

print(numbers.len());
print(numbers.contains(2));
print(numbers.pop());
```

Lists are one of the most common collection types in Calibre, and you will see them often in loops, comprehensions, and iterators.
