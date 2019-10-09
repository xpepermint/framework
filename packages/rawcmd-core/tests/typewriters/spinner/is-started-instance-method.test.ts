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

spec.test('returns `true` when spinwriter is started', async (ctx) => {
  const spinwriter = ctx.get('spinwriter');
  ctx.false(spinwriter.isStarted());
  spinwriter.start();
  ctx.true(spinwriter.isStarted());
});

export default spec;
