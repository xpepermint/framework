import { Spec } from '@hayspec/spec';
import { CommandOption } from '../../../src';

const spec = new Spec();

spec.test('returns command option setter', async (ctx) => {
  const setter = () => true;
  const option = new CommandOption({ setter } as any);
  ctx.is(option.setter, setter);
});

export default spec;
