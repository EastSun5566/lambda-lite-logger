import { Logger } from '../src';

it('should log', () => {
  const fixture = {
    a: {
      b: [{
        c: {
          d: 1,
        },
      }],
    },
  };
  const logger = new Logger();

  logger.info(fixture);

  expect(logger).toBeTruthy();
});
