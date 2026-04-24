---
title: Networking
description: TCP and HTTP requests.
---

The networking stdlib provides several related types:

- `Tcp`
- `TcpStream`
- `TcpListener`
- `Http`
- `HttpClient`
- `HttpResponse`

`Tcp` provides lower-level TCP helpers.

```cal
let stream := Tcp.connect("example.com", 80);
```

`TcpStream` represents a connected stream.

```cal
let stream := TcpStream.connect("example.com", 80);
print(stream.write("GET / HTTP/1.0\r\n\r\n"));
print(stream.read(1024));
stream.close();
```

`TcpListener` represents a listening socket.

```cal
let listener := TcpListener.listen("127.0.0.1", 8080);
let client := listener.accept();
```

For HTTP-style work, the stdlib provides `Http`, `HttpClient`, and `HttpResponse`.

`Http` has convenience helpers for direct requests.

```cal
let response := Http.get("https://example.com");
print(response.body);
```

`HttpClient` stores reusable client settings such as host, port, scheme, and headers.

```cal
let client := Http.client("https://example.com", 443).with_header("Accept: text/plain");
let response := client.get("/");
print(response.body);
```

`HttpResponse` contains:

- `status`
- `headers`
- `body`

`HttpClient` contains:

- `host`
- `port`
- `headers`
- `scheme`

Important HTTP helpers include:

- `Http.client(...)`
- `Http.with_scheme(...)`
- `Http.get(...)`
- `Http.post(...)`
- `Http.request(...)`
- `HttpClient.new(...)`
- `.with_header(...)`
- `.header(...)`
- `.base_url()`
- `.request(...)`
- `.get(...)`
- `.post(...)`