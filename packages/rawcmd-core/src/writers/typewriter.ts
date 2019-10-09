import { EOL } from '@rawcmd/text';
import { toString } from '@rawcmd/utils';
import { ConsoleStreamlet } from '../streamlets/console';
import { StreamletBase, WriterResolver } from '../types';

/**
 * Printer class options interface.
 */
export interface TypewriterConfig {

  /**
   * Message resolver function.
   */
  resolver?: WriterResolver;

  /**
   * Streamlet class instance.
   */
  streamlet?: StreamletBase;

}

/**
 * TTY printer for writing messages to streamlets.
 */
export class Typewriter<Message = any> {

  /**
   * Typewriter configuration.
   */
  public readonly __config: TypewriterConfig;

  /**
   * Class constructor.
   * @param options Printer class options.
   */
  public constructor(config?: TypewriterConfig) {
    this.__config = {
      streamlet: new ConsoleStreamlet(),
      resolver: (message) => toString(message) || '',
      ...config,
    };
  }

  /**
   * Returns TTY screen size as columns and rows.
   */
  public getSize(): [number, number] {
    return [
      this.__config.streamlet.width,
      this.__config.streamlet.height,
    ];
  }

  /**
   * Returns the current streamlet instance.
   */
  public getStreamlet(): StreamletBase {
    return this.__config.streamlet;
  }

  /**
   * Appends row data with new message.
   * @param message Arbitrary message.
   */
  public write(message: Message): this {
    this.__config.streamlet.write(
      this.__config.resolver.call(this, message),
    );
    return this;
  }

  /**
   * Writes EOL character.
   */
  public break(): this {
    this.__config.streamlet.write(EOL);
    return this;
  }

}
