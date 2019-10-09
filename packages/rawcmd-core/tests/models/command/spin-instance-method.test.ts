import { Spec } from '@hayspec/spec';
import { Command, MemoryStreamlet, Spinwriter, Typewriter } from '../../../src';

const spec = new Spec<{
  command: Command;
  streamlet: MemoryStreamlet;
  spinwriter: Spinwriter;
  typewriter: Typewriter;
}>();

spec.beforeEach((ctx) => {
  ctx.set('streamlet', new MemoryStreamlet());
  ctx.set('spinwriter', new Spinwriter({
    streamlet: ctx.get('streamlet'),
  }));
  ctx.set('typewriter', new Typewriter({
    streamlet: ctx.get('streamlet'),
  }));
  ctx.set('command', new Command({}, {
    spinwriter: ctx.get('spinwriter'),
    typewriter: ctx.get('typewriter'),
  }));
});

spec.test('writes messages in animated row', async (ctx) => {
  const streamlet = ctx.get('streamlet');
  const command = ctx.get('command');
  command.spin('foo');
  ctx.is(streamlet.toString(), `⠋ foo `);
  await ctx.sleep(30);
  command.spin('bar');
  ctx.is(streamlet.toString(), `⠙ bar `);
  await ctx.sleep(30);
  command.spin('baz');
  ctx.is(streamlet.toString(), `⠹ baz `);
});

spec.test('animation stops on write', async (ctx) => {
  const streamlet = ctx.get('streamlet');
  const command = ctx.get('command');
  command.spin('foo');
  command.write('bar');
  ctx.is(streamlet.toString(), `bar`);
});

export default spec;
