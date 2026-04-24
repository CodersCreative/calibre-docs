---
title: Select
description: Waiting on channel communication.
---

Calibre supports `select` for channel-based concurrency.

`select` lets the program react to whichever channel operation is ready first.

```cal
select {
  value <- results => {
    print(value);
  },
  job <- jobs => {
    print(job);
  },
  _ => {}
};
```

This is especially useful when working with channels inside concurrent loops.

```cal
for  => {
  select {
    value <- results => {
      print("received => " & value);
    },
    _ => {
      break;
    }
  };
};
```

The wildcard arm `_ => { ... }` acts as a fallback branch.

`select` is most commonly used where the program needs to receive values as they become available instead of polling channels manually.
