import { Spec } from '@hayspec/spec';
import { CommandLink } from '../../../src';

const spec = new Spec();

spec.test('returns command link name', async (ctx) => {
  const link = new CommandLink({ name: 'foo' });
  ctx.is(link.name, 'foo');
});

export default spec;
