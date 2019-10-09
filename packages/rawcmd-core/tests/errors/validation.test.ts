import { Spec } from '@hayspec/spec';
import { createModelClass, Model } from '@rawmodel/core';
import { ValidationError, GenericError } from '../../src';

const spec = new Spec<{
  model: Model;
}>();

spec.before(async (sta) => {
  const User = createModelClass([
    {
      name: 'name',
      validators: [
        { code: 200, resolver: () => false },
      ],
    },
  ]);
  const user = new User();
  await user.validate({ quiet: true });
  sta.set('model', user);
});

spec.test('is generic error', async (ctx) => {
  const model = ctx.get('model');
  const error = new ValidationError(model);
  ctx.true(error instanceof GenericError);
  ctx.deepEqual(error.toJSON(), {
    code: 200,
    message: 'Validation failed.',
    name: 'ValidationError',
  });
});

export default spec;
