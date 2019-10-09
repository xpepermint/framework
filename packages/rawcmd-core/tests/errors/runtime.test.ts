import { Spec } from '@hayspec/spec';
import { RuntimeError, GenericError } from '../../src';

const spec = new Spec();

spec.test('is generic error', async (ctx) => {
  const error = new RuntimeError(100);
  ctx.true(error instanceof GenericError);
  ctx.deepEqual(error.toJSON(), {
    code: 100,
    message: 'Unexpected runtime error.',
    name: 'RuntimeError',
  });
});

export default spec;
