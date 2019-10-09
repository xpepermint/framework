import { Spec } from '@hayspec/spec';
import { CommandOption } from '../../../src';

const spec = new Spec();

spec.test('returns command option getter', async (ctx) => {
  const getter = () => true;
  const option = new CommandOption({ getter } as any);
  ctx.is(option.getter, getter);
});

export default spec;
