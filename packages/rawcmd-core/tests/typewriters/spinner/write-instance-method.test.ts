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

spec.test('does nothing when stopped', async (ctx) => {
  const streamlet = ctx.get('streamlet');
  const spinwriter = ctx.get('spinwriter');
  spinwriter.write('foo');
  ctx.is(streamlet.toString(), ``);
});

spec.test('writes messages in animated row', async (ctx) => {
  const streamlet = ctx.get('streamlet');
  const spinwriter = ctx.get('spinwriter');
  spinwriter.start();
  spinwriter.write('foo');
  ctx.is(streamlet.toString(), `⠋ foo `);
  await ctx.sleep(30);
  spinwriter.write('bar');
  ctx.is(streamlet.toString(), `⠙ bar `);
  await ctx.sleep(30);
  spinwriter.write('baz');
  ctx.is(streamlet.toString(), `⠹ baz `);
});

spec.test('writes multiline message', async (ctx) => {
  const streamlet = ctx.get('streamlet');
  const spinwriter = ctx.get('spinwriter');
  spinwriter.start();
  spinwriter.write('foo\nbar\nbaz\n\n\n');
  ctx.is(streamlet.toString(), `⠋ baz `);
});

spec.test('supports custom characters', async (ctx) => {
  const streamlet = ctx.get('streamlet');
  const spinwriter = new Spinwriter({
    streamlet,
    chars: ['|', '/', '-', '\\'],
  });
  spinwriter.start();
  await ctx.sleep(1);
  ctx.is(streamlet.toString(), '/ ');
  spinwriter.stop();
});

export default spec;
