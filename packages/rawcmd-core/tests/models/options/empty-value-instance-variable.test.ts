import { Spec } from '@hayspec/spec';
import { CommandOption } from '../../../src';

const spec = new Spec();

spec.test('returns command option empty value', async (ctx) => {
  const option = new CommandOption({ emptyValue: 'foo' } as any);
  ctx.is(option.emptyValue, 'foo');
});

export default spec;
