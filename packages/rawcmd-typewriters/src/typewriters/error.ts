import { Command, EOL } from '@rawcmd/core';
import { titleTypewriter } from './title';
import { rowTypewriter } from './row';
import { isUndefined } from '@rawcmd/utils';

/**
 * Error typewriter options interface.
 */
export interface ErrorTypewriterOptions {

  /**
   * Summary section title.
   */
  title?: string;

  /**
   * Default error message.
   */
  message?: string;

  /**
   * Default error code.
   */
  code?: number;

  /**
   * Allowed horizontal width.
   */
  totalWidth?: number;

}

/**
 * Returns a function which builds a string with error text.
 * @param options Error typewriter options.
 */
export function errorTypewriter(options?: ErrorTypewriterOptions) {

  options = {
    title: 'Error',
    message: 'An unexpected error occurred.',
    code: 500000,
    totalWidth: 80,
    ...options,
  };

  const writeTitle = titleTypewriter(options);
  const writeBody = rowTypewriter([
    {
      index: 0,
      width: options.totalWidth,
    },
  ]);

  return (error: any) => {

    if (!error) {
      return '';
    }

    const code = `(${!isUndefined(error.code) ? error.code : options.code})`;
    const title = [options.title, code].join(' ');
    const message = [error.message || options.message];

    const titleOutput = writeTitle(title);
    const bodyOutput = writeBody(message);

    return [titleOutput, bodyOutput].filter((o) => !!o).join(EOL);
  };
}
