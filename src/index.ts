/* eslint-disable no-console */
import stringify from 'fast-safe-stringify';

enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
}

enum Color {
  RESET = '\x1b[0m',
  RED = '\x1b[31m',
  GREEN = '\x1b[32m',
  YELLOW = '\x1b[33m',
}

interface Options {
  prettyPrint?: boolean;
  space?: number;

}

const isObject = (param: unknown): param is object => (
  param !== null && typeof param === 'object'
);

export class Logger {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public options: Options = {
      prettyPrint: true,
      space: 2,
    },
  ) {}

  log(
    type: LogLevel,
    ...params: unknown[]
  ): void {
    const { prettyPrint, space } = this.options;

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    console[type](
      `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
      ...(prettyPrint
        ? params.map((param) => (
          isObject(param)
            ? stringify(param, undefined, space)
            : param
        ))
        : params),
    );
  }

  debug(...params: unknown[]): void {
    if (process.env.NODE_ENV === 'production') return;

    const { DEBUG } = LogLevel;
    const { GREEN, RESET } = Color;

    this.log(
      DEBUG,
      `${GREEN}`,
      `[${DEBUG.toUpperCase()}]`,
      `${RESET}`,
      ...params,
    );
  }

  info(...params: unknown[]): void {
    const { INFO } = LogLevel;
    const { GREEN, RESET } = Color;

    this.log(
      INFO,
      `${GREEN}`,
      `[${INFO.toUpperCase()}]`,
      `${RESET}`,
      ...params,
    );
  }

  warn(...params: unknown[]): void {
    const { WARN } = LogLevel;
    const { YELLOW, RESET } = Color;

    this.log(
      WARN,
      `${YELLOW}`,
      `[${WARN.toUpperCase()}]`,
      `${RESET}`,
      ...params,
    );
  }

  error(...params: unknown[]): void {
    const { ERROR } = LogLevel;
    const { RED, RESET } = Color;

    this.log(
      ERROR,
      `${RED}`,
      `[${ERROR.toUpperCase()}]`,
      `${RESET}`,
      ...params,
    );
  }
}

export default Logger;
