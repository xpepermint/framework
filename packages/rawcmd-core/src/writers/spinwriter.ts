import { ConsoleStreamlet } from '../streamlets/console';
import { StreamletBase, WriterResolver } from '../types';

/**
 * TTY spinwriter options interface.
 */
export interface SpinwriterConfig {

  /**
   * Animation character sequence.
   */
  chars?: string[];

  /**
   * Message resolver function.
   */
  resolver?: WriterResolver;

  /**
   * Animation speed.
   */
  speed?: number;

  /**
   * Streamlet class instance.
   */
  streamlet?: StreamletBase;

}

/**
 * TTY single line typewriter for writing messages to streamlets with spinning
 * animation at the begining of a line.
 */
export class Spinwriter {

  /**
   * Spinner configuration.
   */
  public readonly __config: SpinwriterConfig;

  /**
   * Current animation message.
   */
  protected _message: string;

  /**
   * Animation heartbeat timer.
   */
  protected _timer: any = null;

  /**
   * Class constructor.
   * @param config TTY spinner printer options.
   */
  public constructor(config?: SpinwriterConfig) {
    this.__config = {
      chars: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
      speed: 30,
      streamlet: new ConsoleStreamlet(),
      resolver: (message) => `${[this.getChar(), message].filter((v) => !!v).join(' ')} `,
      ...config,
    };
  }

  /**
   * Returns `true` if the spinner is running.
   */
  public isStarted(): boolean {
    return !!this._timer;
  }

  /**
   * Returns the current animation character.
   */
  public getChar(): string {
    return this.__config.chars[0];
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
   * Starts the animation.
   */
  public start(): this {
    if (!this._timer) {
      this._timer = setTimeout(this._tick.bind(this), 0);
    }
    return this;
  }

  /**
   * Stops the animation.
   */
  public stop(): this {
    if (this._timer) {
      this.__config.streamlet.clearLine();
      clearTimeout(this._timer);
      this._timer = null;
    }
    return this;
  }

  /**
   * Updates animation label.
   * @param message Arbitrary message.
   */
  public write(message: string): boolean {
    if (!this.isStarted()) {
      return false;
    }
    message.trim().split(/\r?\n/g).forEach((line) => { // one line at a time
      this._message = line;
      this._render(); // force repaint
    });
    return true;
  }

  /**
   * Performs animation heartbeat tick.
   */
  protected _tick(): void {
    if (!this._timer) {
      return;
    }
    this.__config.chars.push(this.__config.chars.shift());
    this._render();
    this._timer = setTimeout(this._tick.bind(this), this.__config.speed);
  }

  /**
   * Repaints data of the last streamlet row.
   */
  protected _render(): void {
    this.__config.streamlet.clearLine();
    this.__config.streamlet.write(
      this.__config.resolver.call(this, this._message),
    );
  }

}
