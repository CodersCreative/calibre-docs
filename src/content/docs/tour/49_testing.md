---
title: Tests and Benchmarks
description: Using `test`, `bench`, and `assert`.
---

Calibre has built-in forms for tests and benchmarks, along with tags to control their behavior.

Note that tests can be run using `calibre test` and benchmarks using `calibre bench`.

## Tests

A test is declared with `test`.

```cal
test "showcase core math" => {
  assert(factorial(6) = 720, "factorial(6) should equal 720");
  assert(int.gcd(84, 18) = 6, "int.gcd(84, 18) should equal 6");
};
```

Tests are ordinary Calibre code blocks, so they can call functions, construct values, match results, and use any other language feature.

Assertions are written with `assert(condition, message)`.

```cal
test "showcase conversions" => {
  let ok := parse_and_add("50", 7);
  assert(ok.is_ok(), "parse_and_add should return ok on valid int text");
  assert(("oops" as? int).is_none(), "as? should return none on conversion failure");
};
```

## Tags

Calibre provides several tags specifically for controlling test and benchmark behavior:

### @panics

The `@panics` tag marks a test as one that is expected to panic. This is useful for testing error conditions and panic scenarios.

```cal
const divide := fn (a b : int) -> int => {
  if b = 0 => panic("b must not be 0");
  return a / b;
};

@suite("main") @panics test "something" => {
  assert(7 = 9, "Should fail");
  assert("hello" = "hi", "Should fail");
  divide(10, 0);
};
```

### @bench

The `@bench` tag marks a test as a benchmark and returns a hyperfine style view of how long it took to run.

This is useful when you want repeatable performance measurements written in the language itself.

```cal
@bench
test "my benchmark" => {
  let mut sum := 0;
  
  for i in 0..1000 =>
    sum += i;

  return sum;
};
```

### @suite

The `@suite` tag groups tests or benchmarks into a named suite. This is useful for organizing related tests together.

```cal
@suite("integration")
test "database connection" =>
  assert(connect_to_db().is_ok(), "should connect to database");

@suite("integration")
test "user auth" =>
  assert(authenticate_user("user", "pass").is_ok(), "should authenticate user");

@suite("unit")
test "add numbers" =>
  assert(add(2, 3) = 5, "2 + 3 should equal 5");
```

You can then run specific suites using the test runner.

### @skip

The `@skip` tag allows you to skip a test or benchmark, optionally with a reason. This is useful for temporarily disabling tests that are flaky, slow, or depend on unavailable resources.

```cal
@skip("flaky on CI")
test "network dependent" => {
  // this test will be skipped
};

@skip
test "slow test" => {
  // this test will be skipped without a reason
};
```

### @todo

The `@todo` tag marks a test as not yet implemented. This is useful for documenting test cases that need to be written later and that should be skipped.

```cal
@todo("implement edge case tests")
test "edge cases" => {
  // test not yet implemented
};
```

These tags help you organize and control your test suite effectively, making it easier to manage large projects with many tests.
