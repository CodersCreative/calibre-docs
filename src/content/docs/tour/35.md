---
title: Processes
description: Running external commands.
---

The stdlib provides three process-related types:

- `Process`
- `ExecOptions`
- `ProcessResult`

`Process` is the main entry point for running commands.

```cal
let result := try Process.run("echo", ["hello"]) : e => {
  panic(e);
};

print(result.stdout);
```

`ExecOptions` describes how a command should be executed.

```cal
let opts := Process.options("ls");
print(opts.command);
```

Its fields include:

- `command`
- `args`
- `cwd`
- `shell`
- `stdin`
- `check`

`ProcessResult` describes what happened after execution.

Its fields include:

- `command`
- `status`
- `success`
- `stdout`
- `stderr`

Important `Process` functions include:

- `Process.options(...)`
- `Process.raw(...)`
- `Process.run(...)`
- `Process.run_in(...)`
- `Process.shell(...)`
- `Process.which(...)`

For example:

```cal
let which_git := Process.which("git");
print(which_git);
```

Use these types when your program needs to run shell commands or other external programs and inspect their output.
