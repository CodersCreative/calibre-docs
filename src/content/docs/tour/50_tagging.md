---
title: Tags
description: Using `@init` and `@fin`.
---

Calibre has built-in ways to define multiple or different start functions for your programs, along with many other tags for controlling compilation, testing, and behavior.

## Init

A special tag called `@init` can be used to define the order at which these functions start and which ones start automatically.

```cal
@init(10)
const setup := fn => {
    print("Setting up...");
};
```

Here `@init` is used to say that the `setup` function should be run before `main` or the start point defined in your config which automatically receives the tag `@init(0)`.

`@init` can be called with or without a single i32 integer argument which basically defines its priority. Functions with a higher priority will be run first.

```cal
@init
const setup := fn => {
    print("Setting up...");
};

@init(5)
const load := fn => {
    print("Loading...");
};

const main := fn => {
    print("Running");
};
```
## Fin

In this example the order at which the functions are invoked are : `setup`, `load` then `main` because of their respective priorities of `100` (which is the default for `@init`), `5` and `0` respectively.

Calibre also provides a way to define functions that are run once *all* the start functions have fully finished executing. These functions however are not run in the event that the program is forceably stopped.

The tag to achieve this functionality is called `@fin` and it also takes in a potential i32 integer argument.

```cal
@fin(10)
const cleanup := fn => {
    print("Cleaning up...");
};

@fin(5)
const close := fn => {
    print("Closing...");
};

@fin(0)
const save := fn => {
    print("Saving...");
};
```

Now taking into consideration the previous example and this current one we can come up with an exact order which all these functions will be run:
 - `setup`
 - `load`
 - `main`
 - `cleanup`
 - `close`
 - `save`

Tags can finally also be applied to multiple statements at a time, though arguments will be shared between them. Also keep in mind that a function can be defined with multiple tags at a time, for example `@init @init` or  `@init @fin` are both possible and the function will just be run twice or however many `@init` and `@fin` tags it has.

```cal
@init {
    const logging := fn => {
        print("Logs are totally starting...");
    };
    
    const init := fn => {
        print("Init...");
    };
}
```

Here both `logging` and `init` will end up with an `@init(100)` tag.

Finally keep in mind that the `@init` on the `main` or start point function will be overriden if you add an `@init` to it, allowing you to give it a custom priority that isn't `0`.

## Other Tags

Calibre provides several other tags for different purposes:

### Platform-Specific Tags

#### @os

The `@os` tag conditionally compiles code based on the operating system.

```cal
@os("linux", "macos") print("on either linux or macos");
@os("linux") print("on linux");
@os("macos") print("on macos");
@os("windows") print("on windows");
```

#### @backend

The `@backend` tag conditionally compiles code based on the backend being used.

```cal
@backend("interpreter") print("on the rust-based interpreter");
```

### Documentation Tags

#### @deprecated

The `@deprecated` tag marks code as deprecated, optionally with a message explaining why or what to use instead.

```cal
@deprecated("use new_function instead")
const old_function := fn => {
  // deprecated implementation
};
```

### Behavior Tags

#### @default

The `@default` tag marks a type as having default values for its fields.

```cal
@default
type Human := struct {
  name : str,
  age : uint = 10u,
  country : str = "Zimbabwe",
};
```

#### @builder

The `@builder` tag generates builder pattern methods for a type.

```cal
@builder
type Config := struct {
  host : str,
  port : int,
};
```

#### @pure

The `@pure` tag marks a function as pure (no side effects), enabling memoization.

```cal
@pure
const calculate := fn (x : int) -> int => {
  return x * 2;
};

@pure(memo)
const fib := fn (n : int) -> int => 
    return n if n < 2 else (fib(n - 1) + fib(n - 2));


// You can also specify specific parameters to memoize:
@pure(memo(x, y)) // Or @pure(memo(0, 1))
const memoized := fn (x : int, y : int, z : int) -> int => {
  // only x and y are used for memoization
  return x + y + z;
};
```

### Compiler Directive Tags

#### @caller_context

The `@caller_context` tag provides access to the caller's context information.

```cal
@caller_context
const get_caller_info := fn => {
  // can access caller context
};
```

### Type Checking Override Tags

These tags disable specific type checking rules:

- `@ignore_invalid_return` - Disables invalid return type checking
- `@ignore_invalid_let` - Disables invalid let binding checking
- `@ignore_invalid_type_check` - Disables type checking
- `@ignore_invalid_binary` - Disables invalid binary operation checking
- `@ignore_invalid_comparison` - Disables invalid comparison operation checking
- `@ignore_invalid_boolean` - Disables invalid boolean operation checking

These should be used sparingly and only when you have a specific reason to bypass type checking.

They're mainly used when dealing with non-calibre code.

```cal
@ignore_invalid_type_check
const unsafe_operation := fn => {
  // type checking disabled here
};
```

### Operator Overloading Tag

#### @overload

The `@overload` tag defines operator overloads for custom types. This allows you to define how your types behave with built-in operators.

```cal
@overload("+") fn (self : MyType, other : MyType) -> MyType => {
  return MyType { value : self.value + other.value };
};

// This is also perfectly valid to have the function usable as both an overload and a function
@overload("+") const my_type_add := fn (self : MyType, other : MyType) -> MyType => {
  return MyType { value : self.value + other.value };
};
```

This is covered in more detail in the Operators section.

### Context Tags

These tags allow you to access additional information about the context of the function

They both allow the user to access a `ExecContext` struct using `caller_context` or `current_context` depending on which tag is used.

This may be really useful when doing stuff like getting the current path to the file that the functions may be defined in or their span

The `ExecContext` struct is shown below and is defined within the stdlib.

```cal
type ExecContext := struct {
	function_name module_name path : str,
	span : range
};
```

#### @caller_context

The `@caller_context` tag provides access to the caller's context information.

Note that `@caller_context` isnt stable yet

```cal
@caller_context
const get_caller_info := fn => {
  // can access caller context
};
```

#### @current_context

The `@current_context` tag is similar to `@caller_context` but uses the current context for injection.

```cal
@current_context const main := fn => {
	let file : File = try File.open_read(Path.new(current_context.path.replace("main.cal", "input.txt"))) : e => {
		try File.open_read(Path.new(current_context.path.replace("main.cal", "custom_input.txt"))) => {
			print(e);
			return;
		};
	};
	
	let lines := try file.read_lines() => panic("Failed to read file.");
	
	let part1 := count_zeros_part1(lines);
	let part2 := count_zeros_part2(lines);
	
	print("Part 1 - The password is: " & part1);
	print("Part 2 - The password using 0x434C49434B is: " & part2);
};
```

### @package

The `@package` tag is similar to the context tags except it returns a `Package` struct showcasing the current project information that can be accessed using `package`

The `Package` struct is shown below and is defined within the stdlib.

```cal
type Package := struct {
	name version description license repository homepage src root : str
};
```
