---
title: Ranges and Iterators
description: Working with numerical sequences and iteration.
---

Calibre has a built-in `range` type, which you use with syntax like `0..10` or `1..=5`.

The stdlib adds useful methods to `range`.

```cal
let r := 0..5;

print(r.len());
print(r.start());
print(r.end());
print(r.contains(3));
print(r.to_list());
print(r.sum());
```

Ranges can also be turned into iterators with `.into_iter()`.

The stdlib defines a generator type `gen:<T>` which can be converted to 
by most collections in the language:

- `gen:<T>` for list
- `gen:<int>` for range
- `gen:<char>` for str
- `gen:<<K, V>>` for HashMap
- `gen:<T>` for HashSet

These types implement an "as" overide for conversion to a generator which provides iterator-style methods such as:

- `.collect()`
- `.map(...)`
- `.filter(...)`
- `.for_each(...)`
- `.fold(...)`
- `.any(...)`
- `.all(...)`
- `.find(...)`
- `.count()`
- `.take(...)`
- `.skip(...)`
- `.enumerate()`
- `.step_by(...)`
- `.partition(...)`

For example:

```cal
let mapped := list:<int>[1, 2, 3] as! gen:<int>.map(fn (x : int) -> int => return x * 10).collect();
let filtered := list:<int>[1, 2, 3, 4] as! gen:<int>.filter(fn (x : int) -> bool => return x % 2 = 0).collect();
let folded := list:<int>[1, 2, 3, 4] as! gen:<int>.fold(0, fn (acc : int, x : int) -> int => return acc + x);
```

You can also work with iterator values manually through `.next()`.

```cal
let mut it := (0..3) as! gen:<int>;

print(it.next());
print(it.next());
print(it.next());

let mut it : gen:<int> = (0..3) as! gen:<int>;
for let .Some : x => it.next() => print(x);
```
