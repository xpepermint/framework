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
  }).start());
});

spec.afterEach((ctx) => {
  ctx.get('spinwriter').stop();
});

spec.test('starts animation', async (ctx) => {
  const spinwriter = ctx.get('spinwriter');
  ctx.true(spinwriter.isStarted());
  spinwriter.stop();
  ctx.false(spinwriter.isStarted());
});

export default spec;
