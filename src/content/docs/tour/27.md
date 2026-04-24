---
title: Enums
description: Values that can be one of several variants.
---

Enums let a value be one of several named variants.

```cal
type Language := enum {
  FRENCH : FrenchData,
  ENGLISH : int,
  SPANISH,
  ARABIC : <Language, Language>
};
```

Each variant may carry different kinds of data:

- no payload at all, like `SPANISH`
- a single value, like `ENGLISH : int`
- a struct payload, like `FRENCH : FrenchData`
- a tuple payload, like `ARABIC : <Language, Language>`

You create enum values by naming the variant.

```cal
let english : Language = Language.ENGLISH : 6;
let french := Language.FRENCH : FrenchData { data : 10, code : 5 };
let spanish := Language.SPANISH;
```

Enums are most powerful when combined with pattern matching.

```cal
match english {
  .ENGLISH : level => print(level),
  .SPANISH => print("spanish"),
  _ => print("other")
};
```

Payloads can be destructured directly in the match arm.

```cal
match french {
  .FRENCH : {data: d, code: c} => print(d + c),
  _ => print("other")
};
```

Tuple payloads can also be destructured.

```cal
type PairEnum := enum { Normal : Pair, Tuple : <int, int> };

match PairEnum.Tuple : (10, 30) {
  .Tuple : (left, right) => print(left + right),
  _ => {}
};
```

Use enums when a value can take several different shapes, and each shape should be handled explicitly.
