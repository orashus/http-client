# Welcome to `@orashus/http-client` pkg

[![current version]( https://img.shields.io/badge/@latest-v0.0.1-gold)](https://www.npmjs.com/package/@orashus/http-client)
[![author RashJrEdmund]( https://img.shields.io/badge/Author-RashJrEdmund-blue)](https://github.com/rashjredmund)

A lightweight http-client built on top of the JavaScript Fetch API

__table of content__

- [installation](#installation)
- [how to use](#how-to-use)
- [options object](#options-object)

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

- First import the `HTTP_CLIENT` class from `"@orashus/http-client"` and create an instance of it with default configuration options.
  - choose between `local` for localStorage and `session` for sessionStorage

```ts
  import { HTTP_CLIENT } from "@orashus/http-client";

  const httpClient = new HTTP_CLIENT("/auth");
```

## Options Object

The following are optional `options` arguments properties that the `HTTP_CLIENT   class takes and their uses
