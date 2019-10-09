import { toString } from '@rawcmd/utils';
import { EOL, sizeText } from '@rawcmd/text';
import { textTypewriter } from './text';
import { rowTypewriter } from './row';

/**
 * Log typewriter options interface.
 */
export interface LogTypewriterOptions {

  /**
   * Allowed horizontal width.
   */
  totalWidth?: number;

}

/**
 * Returns a function which builds a string for displaying log message.
 * @param options Log typewriter options.
 */
export function logTypewriter(options?: LogTypewriterOptions) {

  options = {
    totalWidth: 80,
    ...options,
  };

  const writeDim = textTypewriter({
    dim: true,
  });

  return (message: string, namespace?: string, date?: Date) => {

    if (!toString(message)) {
      return '';
    }

    console.log('X', date, date || new Date());

    const data = [
      writeDim([
        (date || new Date()).toISOString(),
        namespace,
      ].filter((d) => !!d).join(' ')),
      message,
    ].filter((d) => !!d);

    const bodyTypewriter = rowTypewriter([
      {
        index: 0,
        width: sizeText(data[0]),
      },
      {
        index: 1,
        width: options.totalWidth - sizeText(data[0]),
      },
    ]);

    return bodyTypewriter(data);
  };
}
