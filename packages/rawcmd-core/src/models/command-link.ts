/**
 *  link data type.
 */
export type CommandLinkData = (
  CommandLink
  | CommandLinkRecipe
  | (() => (CommandLink | CommandLinkRecipe))
);

/**
 * Command link interface.
 */
export interface CommandLinkRecipe {

  /**
   * Link name.
   */
  name: string;

  /**
   * Link URL.
   */
  url?: string;

}

/**
 * Command link model.
 */
export class CommandLink {

  /**
   * Link name.
   */
  public name: string;

  /**
   * Link URL.
   */
  public url: string;

  /**
   * Class constructor.
   * @param recipe Command link recipe.
   */
  public constructor(recipe?: CommandLinkRecipe) {
    recipe = { ...recipe };
    this.name = recipe.name || null;
    this.url = recipe.url || null;
}

  /**
   * Returns a new Link instance which is the exact copy of the original.
   * @param recipe Command link recipe.
   */
  public clone(recipe?: CommandLinkRecipe): this {
    return new (this.constructor as any)({
      name: this.name,
      url: this.url,
      ...recipe,
    });
  }

}
