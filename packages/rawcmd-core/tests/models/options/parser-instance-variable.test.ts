import { Spec } from '@hayspec/spec';
import { CommandOption } from '../../../src';

const spec = new Spec();

spec.test('returns command option parser', async (ctx) => {
  const parser = { array: true };
  const option = new CommandOption({ parser } as any);
  ctx.deepEqual(option.parser, parser);
});

export default spec;
