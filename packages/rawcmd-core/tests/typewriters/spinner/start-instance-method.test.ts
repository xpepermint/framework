import { Spec } from '@hayspec/spec';
import { Spinwriter, MemoryStreamlet } from '../../../src';

const spec = new Spec<{
  streamlet: MemoryStreamlet;
  spinwriter: Spinwriter;
}>();

spec.beforeEach((ctx) => {
  ctx.set('streamlet', new MemoryStreamlet());
  ctx.set('spinwriter', new Spinwriter({
    streamlet: ctx.get('streamlet'),
  }));
});

spec.afterEach((ctx) => {
  ctx.get('spinwriter').stop();
});

spec.test('starts animation', async (ctx) => {
  const streamlet = ctx.get('streamlet');
  const spinwriter = ctx.get('spinwriter');
  ctx.is(streamlet.toString(), '');
  spinwriter.start();
  await ctx.sleep(10);
  ctx.is(streamlet.toString(), '⠙ ');
});

export default spec;
