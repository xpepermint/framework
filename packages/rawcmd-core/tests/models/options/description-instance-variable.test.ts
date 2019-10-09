import { Spec } from '@hayspec/spec';
import { CommandOption } from '../../../src';

const spec = new Spec();

spec.test('returns command option description', async (ctx) => {
  const option = new CommandOption({ description: 'foo' } as any);
  ctx.is(option.description, 'foo');
});

export default spec;
