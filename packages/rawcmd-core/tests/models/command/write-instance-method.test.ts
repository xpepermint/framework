import { Spec } from '@hayspec/spec';
import { EOL, Command, Typewriter, MemoryStreamlet } from '../../../src';

const spec = new Spec<{
  streamlet: MemoryStreamlet;
  typewriter: Typewriter;
  command: Command;
}>();

spec.beforeEach((ctx) => {
  ctx.set('streamlet', new MemoryStreamlet());
  ctx.set('typewriter', new Typewriter({
    streamlet: ctx.get('streamlet'),
  }));
  ctx.set('command', new Command({}, {
    typewriter: ctx.get('typewriter'),
  }));
});

spec.test('writes multiple mesages in single line', async (ctx) => {
  const streamlet = ctx.get('streamlet');
  const command = ctx.get('command');
  command.write('a', 'bc');
  command.write('d');
  ctx.is(streamlet.toString(), 'abcd');
});

spec.test('converts EOLs to valid EOL', async (ctx) => {
  const streamlet = ctx.get('streamlet');
  const command = ctx.get('command');
  command.write('a\nb\r\nc');
  ctx.is(streamlet.toString(), `a${EOL}b${EOL}c`);
});

export default spec;
