# Lambda lite logger

[![NPM Version](https://img.shields.io/npm/v/lambda-lite-logger.svg?style=for-the-badge)](https://www.npmjs.com/package/lambda-lite-logger)
[![NPM Downloads](https://img.shields.io/npm/dt/lambda-lite-logger.svg?style=for-the-badge)](https://www.npmjs.com/package/lambda-lite-logger)
[![License](https://img.shields.io/github/license/EastSun5566/lambda-lite-logger.svg?style=for-the-badge)](https://github.com/EastSun5566/lambda-lite-logger/blob/main/LICENSE)

> 📝 Yet another logger for Lambda

## Why

I just want to pretty print any nest object param from log with some color..., nothing fancy.

## installation

```sh
npm i lambda-lite-logger
```

## Usage

### Basic

```ts
import { Logger } from "lambda--lite-logger";

const logger = new Logger();

// Pretty print nest object with 2 space by default
// [INFO] some data {
//   a: [
//     {
//       b: 1,
//       c: {
//         d: 2
//       }
//     }
//   ]
// }
logger.info("some data", { a: [{ b: 1, c: { d: 2 } }] });
```

### More

```ts
const logger = new Logger({
  prettyPrint: false, // turn off prettyPrint, default is true
  space: 4, // prettyPrint indent by 4 space, , default is 2
});

logger.debug("Only log process.env.NODE_ENV is not production"); // [DEBUG] ...
logger.warn("Warning"); // [WARN] warning
logger.error("Oh no"); // [ERROR] Oh no

logger.log("info", "low level API, just equal logger.info"); // [INFO] ...
```
