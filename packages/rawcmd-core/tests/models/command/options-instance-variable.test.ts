import { Spec } from '@hayspec/spec';
import { Command, CommandOption } from '../../../src';

const spec = new Spec();

spec.test('returns command options', async (ctx) => {
  const options = [
    { name: 'foo' },
    new CommandOption({ name: 'bar' }),
    () => ({ name: 'baz' }),
  ];
  const command = new Command({ options });
  ctx.true(command.options[0] instanceof CommandOption);
  ctx.true(command.options[1] instanceof CommandOption);
  ctx.true(command.options[2] instanceof CommandOption);
  ctx.is(command.options[0].name, 'foo');
  ctx.is(command.options[1].name, 'bar');
  ctx.is(command.options[2].name, 'baz');
});

export default spec;
