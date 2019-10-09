import { Spec } from '@hayspec/spec';
import { logTypewriter, EOL } from '../../src';

const spec = new Spec();

spec.test('builds output string with message', (ctx) => {
  const date = new Date();
  const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing justo mauris elit.';
  ctx.deepEqual(logTypewriter()(message, null, date), [
    `\u001b[2m${date.toISOString()}\u001b[22m Lorem ipsum dolor sit amet, consectetur adipiscing justo`,
    `                         mauris elit.                                            `,
  ].join(EOL));
});

spec.test('builds output string with message and namespace', (ctx) => {
  const date = new Date();
  const namespace = 'foo';
  const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing justo mauris elit.';
  ctx.deepEqual(logTypewriter()(message, namespace, date), [
    `\u001b[2m${date.toISOString()} foo\u001b[22m Lorem ipsum dolor sit amet, consectetur adipiscing  `,
    `                             justo mauris elit.                                  `,
  ].join(EOL));
});

export default spec;
