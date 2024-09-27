# Welcome to `@orashus/http-client` pkg

|
___

![http client logo"](https://github.com/orashus/http-client/blob/main/assets/http-client-logo.png?raw=true)

___

[![current version]( https://img.shields.io/badge/@latest-v0.0.1-gold)](https://www.npmjs.com/package/@orashus/http-client)
[![author RashJrEdmund]( https://img.shields.io/badge/Author-RashJrEdmund-blue)](https://github.com/rashjredmund)

A lightweight http-client built on top of the JavaScript Fetch API

__table of content__

- [installation](#installation)
- [how to use](#how-to-use)
- [options object](#options-object)
- [supported request methods](#supported-request-methods)
- [disclaimer/flex 🥷🏽](#disclaimerflex)

## Installation

To install run

```bash
  # npm
  npm install @orashus/http-client

  # pnpm
  pnpm install @orashus/http-client

  # yarn
  yarn add @orashus/http-client
```

## How to use

- There are 2 ways to get the http client class depending on how useful each is to you, for both ways, you have to create an instance of it to be able to use it.
  
  - First and common is to import the class from `@orashus/http-client` like so

    ```ts
      import { HttpClient } from "@orashus/http-client";

      const httpClient = new HttpClient({
        base_url: "http://localhost:8080",
        base_headers: {
          "x-some-api-key": "that api key value",
        },
        before_req_headers: () => {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
    ```

  - Or you use the http client provider, from which you could assign more options. This provider, returns a class that will inherit and use the default options you've passed to the provider... You can further give the returned class it's own options as well.

  ```ts
      import { HttpClientProvider } from "@orashus/http-client";

      const HttpClient = HttpClientProvider({
        api_base_url: "http://localhost:8080",
        api_base_headers: {
          "x-some-api-key": "that api key value",
        },
        base_before_req_headers: () => {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      const authHC = new HttpClient({
        base_url: "/auth",
      });

      // use like so

      authHC.POST("/login", {
        email: "test@email.com",
        password: "123456"
      }, {
        // optionally add any headers specific to this endpoint
      });

      authHC.GET("/current-user", {
        // second arg is for optional headers
      });
    ```

## Options Object

The following are all `options` arguments properties that the both the `HttpClientProvider` & the `HttpClient` class takes.

- `HttpClientProvider`

  ```ts
    {
      api_base_url?: string = "",
      api_base_headers?:HeadersInit = {},
      base_before_req_headers?: () => HeadersInit,
    }
  ```

- `HttpClient`

  ```ts
    {
      base_url?: string = "",
      base_headers?: HeadersInit = {},
      before_req_headers?: () => HeadersInit,
    }
  ```

## Supported Request Methods

  As of now `@orashus/http-client` supports the following request methods

- GET
- DELETE
- POST
- PUT
- PATCH

## Disclaimer/Flex

ChatGPT or any associated AI models have no hand in my code base! 🥷🏽

___

|

|

HAPPY CODING!!
