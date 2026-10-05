---
title: Duration
description: Time durations.
---

The thread stdlib provides the `Duration` type.

```cal
let d := Duration.from_ms(500);
```

`Duration` stores a length of time in milliseconds and provides helpers for constructing and inspecting it.

Important `Duration` helpers include:

- `Duration.from_ms(...)`
- `Duration.from_s(...)`
- `Duration.from_us(...)`
- `.as_ms()`
- `.as_s()`
- `.is_zero()`
- `.sleep()`

For example:

```cal
let d := Duration.from_s(1);
print(d.as_ms());
d.sleep();
```

The stdlib also provides top-level helpers:

- `wait(ms)`
- `sleep(duration)`

```cal
wait(100);
sleep(Duration.from_ms(250));
```

Use `Duration` when you want time values to be explicit instead of passing raw integers around.
