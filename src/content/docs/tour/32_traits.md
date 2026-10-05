---
title: Traits
description: Shared behavior across different types.
---

Calibre does not have a traditional trait system like Rust or interfaces like Java. Instead, it achieves the same goals through a combination of structs, impl blocks, and the `as` operator with overloading.

## Why No Traits?

Traditional trait systems can add complexity to the language through:
- Trait bounds and generic constraints
- Trait coherence rules
- Orphan rules for implementing foreign traits on foreign types
- Complex trait resolution and conflict resolution

Calibre takes a simpler approach that provides the same benefits without the complexity. As [Kayla explains in "All you need is data and functions"](https://mckayla.blog/posts/all-you-need-is-data-and-functions.html), traits are essentially just types with conversion functions. You can achieve the same expressiveness and composition without the complexity of a formal trait system.

The core insight is that **traits are just types**. Instead of a trait, you make a type that implements the generic behavior you want, and then write a function to convert your data-type into your trait-type. If you need some data-type specific logic, you pass around functions as necessary (usually from your conversion function).

## Structs as Traits

In Calibre, any struct can serve as a "trait" by defining methods in an impl block. Other types can then "implement" this trait by providing an `as` conversion to that struct.

```cal
// Define a "trait" as a struct
type Person := struct {
  name : str,
}

impl Person {
  const get_name := fn(self : &Self) -> str =>
    return self.name;

  const greeting := fn(self : &Self) -> str =>
    return "Hello " & self.get_name();
}
```

## Implementing the Trait

To implement this "trait" for another type, you use the `@overload("as")` annotation to provide a conversion function:

```cal
type User := struct { name : str };

// Implement the Person "trait" for User
@overload("as") fn(self : User) -> Person =>
  return Person {name : self.name};
```

Now you can use a User anywhere a Person is expected by converting it:

```cal
let user := User { name : "Ty" };
// Note that the brackets are not necessary around `user as! Person`
print((user as! Person).greeting()); // "Hello Ty"
```

## Default Values with @default

The `@default` tag makes this pattern even more powerful by allowing structs to have default field values. This makes it easy to implement "traits" with sensible defaults:

```cal
@default
type Human := struct {
  name : str,
  age : uint = 10u,
  country : str = "Zimbabwe",
};

type Ty := struct { };

@overload("as") fn(self : Ty) -> Human => {
  let mut human := Human.default();
  human.name = "Ty";
  return human;
};
```

## Benefits of This Approach

1. **Simplicity**: No special trait syntax or resolution rules
2. **Flexibility**: Any type can convert to any other type via overloading
3. **Explicit**: Conversions are explicit via the `as` operator
4. **Composable**: You can chain conversions and combine behaviors
