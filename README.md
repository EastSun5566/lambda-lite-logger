# Lambda logger

> 📝 Yet another logger for Lambda

## Why

I just want to pretty print any nest object param from log..., nothing complex.

## Usage

### Basic

```ts
import { Logger } from "lambda-logger";

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
logger.debug("Only log process.env.NODE_ENV is not production"); // [DEBUG] ...

logger.warn("Warning"); // [WARN] warning
logger.error("Oh no"); // [ERROR] Oh no
```
