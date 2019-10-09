import { Spec } from '@hayspec/spec';
import { CommandOption } from '../../../src';

const spec = new Spec();

spec.test('returns command option alias', async (ctx) => {
  const option = new CommandOption({ alias: 'foo' } as any);
  ctx.is(option.alias, 'foo');
});

export default spec;
