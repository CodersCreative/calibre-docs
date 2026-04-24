---
title: Block Macros
description: Reusing named blocks.
---

Calibre supports block macros, which let you name and reuse a block pattern.

They are useful when a piece of logic is too large to repeat comfortably, but you do not want to turn it into a full function or type.

```cal
let => @add_scope [$first := 9f, $second := 11f, $t := type : float] {
  print($first + $second);
};
```

The values inside `[...]` act like named inputs to the block macro.

Inside the macro body, those inputs can be referenced with `$name`.

```cal
let => @show_total [$left := 10, $right := 20] {
  let total := $left + $right;
  print(total);
};
```

Once defined, a block macro can be invoked again, optionally with new values.

```cal
=> @add_scope; // Uses the default inputs
=> @add_scope [$first := 30, $second := 70, $t := type : int] {{}}; // Inputs are overwritten
```

Unlike a function call, block-macro inputs are named rather than positional.

```cal
=> @show_total [$left := 5, $right := 99];
```

Block macros also interact with scope creation. Depending on how the macro is defined and invoked, you can choose whether a new scope is created.

```cal
=> @add_scope [$first := 30, $second := 70, $t := type : int] {{}};
```

Block macros are really useful when you want to reuse logic in different situations easily and when you want the same basic logic but whilst using different types;
