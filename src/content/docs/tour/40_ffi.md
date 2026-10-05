---
title: FFI
description: Calling foreign code with `extern`.
---

Calibre supports foreign function interfaces through `extern`.

This lets Calibre code call functions defined outside the language, such as C or Zig functions in shared libraries.

This declaration says:

- the foreign ABI is `"c"`
- the name to be used in Calibre is `c_abs`
- the foreign function type is `fn(@int) -> @int`
- the function is loaded from `"libc"` (note that libc does not require a path and the interpreter will load it for you)
- the real foreign name is `"abs"`

```cal
extern "c" const c_abs := fn(@int) -> @int from "libc" as "abs";
```

Calibre supports different foreign ABIs, including at least `"c"` and `"zig"`.

```cal
extern "zig" const zig_add := fn(@i32, @i32) -> @i32 from "./libzigffi.so" as "zig_add";
```

Foreign function signatures often use FFI primitive types written with `@...`, such as:

- `@int`
- `@uint`
- `@i32`
- `@i64`
- `@u8`
- `@usize`
- `@isize`

These are used to describe the exact calling convention and layout expected by the foreign code.

For example:

```cal
extern "c" const c_strlen := fn(str) -> @usize from "libc" as "strlen";
extern "c" const c_strerror := fn(@int) -> str from "libc" as "strerror";
```

You can call these declarations like normal Calibre functions and the values will be converted into the correct size as required.

```cal
let size := c_strlen("hello");
print(size);

let message := c_strerror(0);
print(message);
```

FFI also works with raw pointers.

```cal
extern "c" const c_memcmp := fn(ptr:<@u8>, ptr:<@u8>, @usize) -> int from "libc" as "memcmp";
```

This is common for C-style APIs that expect buffers and lengths.

You can also pass structs across the FFI boundary when their layout is compatible with what the foreign side expects.

```cal
type Bytes := struct { first second third : @i64 };

extern "c" const bytes_sum := fn(Bytes) -> @i64 from "libcalffi.so" as "bytes_sum";
```

Then call them normally:

```cal
let bytes := Bytes { first : 255, second : 512, third : 1024 };
let sum := bytes_sum(bytes);
print(sum);
```

The Zig example follows the same pattern:

```cal
type Point := struct { x y : @i64 };

extern "zig" const zig_dot := fn(Point) -> @i64 from "./libzigffi.so" as "zig_dot";
extern "zig" const zig_sum_bytes := fn(ptr:<@u8>, @usize) -> @i64 from "./libzigffi.so" as "zig_sum_bytes";
```

FFI is powerful, but it is also lower-level than normal Calibre code. When using it, you need to be careful.

Use `extern` when Calibre needs to interop with existing native libraries, operating system APIs, or performance-critical foreign code.
