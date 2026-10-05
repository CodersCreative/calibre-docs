---
title: Spawn and WaitGroups
description: Running work concurrently.
---

Calibre provides `spawn` for running work concurrently.

## Basic Spawn

The simplest form spawns a block of work.

```cal
let wg := spawn {
  => print("task A"),
  => print("task B")
};
```

The returned value is typically a `WaitGroup`, which can be used to wait until all spawned work is done.

```cal
wg.wait();
```

## Defer with Spawn

You will often see this written together with `defer` or `defer return`.

```cal
let wg := spawn for i in 0..10 => {
  print("worker " & i);
};

defer wg.wait();
```

## Spawn For

`spawn for` is a very common variation. It starts one concurrent task for each iteration of a loop.

This is useful when the same job structure should run across many inputs or worker ids.

```cal
let worker_count := 10;
let wg := spawn for i in 0..worker_count => {
  print("spawned worker " & i);
};
```

## Spawn At

Calibre also supports `spawn@`, which is useful for when you want the worker to be waited immediately. Note that `spawn@` can be used anywhere `spawn` is applicable.

```cal
spawn@ for i in 0..100 => {
  print("num => " & i);
};

spawn@ {
  => print("spawn block => A"),
  => print("spawn block => B")
};
```

## Spawn in Comprehensions

Another variation is spawning inside a comprehension.

This creates a list whose elements are produced by spawned work. Note that the list has no ordering guarantees.

```cal
let width := 32;

let concurrent := [i spawn for i in 0..=width];
```

## Wait Groups

Wait groups are the main synchronization primitive for spawned work. The stdlib `WaitGroup` type provides:

- `WaitGroup.new()`
- `.raw_add(...)`
- `.raw_done()`
- `.join(...)`
- `.wait()`
- `.count()`

In everyday code, raw_add and raw_done should not be used as its generally better standard to combine them together using `.join` or using by using a `spawn {...}` block.

This feature mirrors goroutines in a lot of ways so checking the Go documentation can help if you're still unsure about it.