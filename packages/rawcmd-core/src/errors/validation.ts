import { Model } from '@rawmodel/core';
import { GenericError } from './generic';

/**
 * Model validation error.
 */
export class ValidationError extends GenericError {

  /**
   * Class constructor.
   * @param model Model instance.
   */
  public constructor(model: Model) {
    super();

    const errors = model.collectErrors();
    this.message = 'Validation failed.';
    this.code = errors.length ? errors[0].code : -1;

    Error.captureStackTrace(this, this.constructor);
  }

}
