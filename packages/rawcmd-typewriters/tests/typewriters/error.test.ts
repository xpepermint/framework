import { Spec } from '@hayspec/spec';
import { GenericError } from '@rawcmd/core';
import { errorTypewriter, EOL } from '../../src';

const spec = new Spec();

spec.test('builds output string', (ctx) => {
  const error = new GenericError('foo', 100);
  ctx.deepEqual(errorTypewriter()(error), [
    '\u001b[1mERROR (100)\u001b[22m                                                                     ',
    'foo                                                                             ',
  ].join(EOL));
});

spec.test('handles unknown errors', (ctx) => {
  const error = new Error();
  ctx.deepEqual(errorTypewriter()(error), [
    '\u001b[1mERROR (500000)\u001b[22m                                                                  ',
    'An unexpected error occurred.                                                   ',
  ].join(EOL));
});

export default spec;
