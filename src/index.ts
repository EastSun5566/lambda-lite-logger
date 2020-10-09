/* eslint-disable no-console */
enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
}

enum Color {
  RED = '\x1b[31m',
  GREEN = '\x1b[32m',
  BLUE = '\x1b[34m',
  YELLOW = '\x1b[33m',
}

interface Options {
  prettyPrint?: boolean;
  space?: number;
}

export class Logger {
  private static isObject = (param: unknown): boolean => param !== null && typeof param === 'object'

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

    console[type](
      ...(prettyPrint
        ? params.map((param) => (
          Logger.isObject(param)
            ? JSON.stringify(param, null, space)
            : param
        ))
        : params),
    );
  }

  debug(...params: unknown[]): void {
    if (process.env.NODE_ENV === 'production') return;

    this.log(
      LogLevel.DEBUG,
      `${Color.GREEN} ${LogLevel.DEBUG.toUpperCase()}`,
      ...params,
    );
  }

  info(...params: unknown[]): void {
    this.log(
      LogLevel.INFO,
      `${Color.GREEN} ${LogLevel.INFO.toUpperCase()}`,
      ...params,
    );
  }

  warn(...params: unknown[]): void {
    const { WARN } = LogLevel;

    this.log(
      WARN,
      `${Color.YELLOW} ${WARN.toUpperCase()}`,
      ...params,
    );
  }

  error(...params: unknown[]): void {
    const { ERROR } = LogLevel;

    this.log(
      ERROR,
      `${Color.RED} 
      ${ERROR.toUpperCase()}`,
      ...params,
    );
  }
}

export default Logger;
