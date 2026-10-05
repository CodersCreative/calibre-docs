---
title: Overloads
description: Operator Overloading.
---

Calibre supports operator overloading through `@overload`.

This lets a type customize how certain basic expressions behave.

You declare overloads directly on the type definition.

```cal
type Vec2 := struct { x y : int }

@overload("+") fn (a : Vec2, b : Vec2) -> Vec2 => return Vec2 { x : a.x + b.x, y : a.y + b.y };
```

In this example, `v + w` now uses the custom `+` implementation for `Vec2`.

```cal
let v := Vec2 { x : 1, y : 2 };
let w := Vec2 { x : 3, y : 4 };
print(v + w);
```

Overloads are written as specially named `const` items inside the `@overload` block.

Some of the core operations that can be overloaded include:

- arithmetic operators like `"+"`
- equality with `"="`
- indexing with `"[]"`
- indexed assignment with `"[]="`
- membership with `"in"`
- conversions with `"as"`

For example, equality can be customized:

```cal
// Note that "=" overload must return a bool
@overload("=") fn (a b : Vec2) -> bool => return a.x = b.x && a.y = b.y;
```

Now expressions like `v = other_vec` use this logic.

Indexing can also be overloaded.

```cal
// Note that the overload must return an optional
@overload("[]") fn (self : Vec2, idx : int) -> int? => {
  if idx = 0 => return some(self.x);
  if idx = 1 => return some(self.y);
  return none;
};
```

That allows expressions like:

```cal
print(v[0]);
print(v[1]);
```

Indexed assignment can be overloaded separately with `"[]="`.

```cal
// It is recommended but not required to have your assignment return a value
@overload("[]=") fn (self : Vec2, idx : int, value : int) -> Vec2 => {
  if idx = 0 => return self.x := value;
  if idx = 1 => return self.y := value;
  return self;
};
```

This enables syntax like:

```cal
let mut v := Vec2 { x : 1, y : 2 };
v[0] := 9;
```

The `in` operator can also be customized.

```cal
// Note that it must return a bool
@overload("in") fn (value : int, vec : Vec2) -> bool => return value = vec.x || value = vec.y;

```

So code like `2 in v` can mean whatever membership rule makes sense for the type.

The `as` operation can be overloaded too.

```cal
// Note that the overload must return an result
@overload("as") fn (self : Vec2) -> null!str => return ok("Vec2");
```

This makes expressions like `v as str` use your custom conversion behavior.

Overloads are not just for user-defined structs. They can also be applied to other types.

```cal
@overload("as") fn (self : int) -> null!str => return ok("int");
```

Use `@overload` when you want a type to participate naturally in Calibre expressions like `+`, `[]`, `in`, or `as`,
but keep in mind that overloaded behavior should still feel intuitive to someone reading the code.

`@overload` is also the first example so far of the Calibre tagging system which wil be covered more later
