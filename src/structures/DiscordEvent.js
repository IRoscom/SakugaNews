/**
 * @template {keyof import("discord.js").ClientEvents} Events
 */
module.exports = class DiscordEvent {
  data;
  /**
   * @typedef {Object} Structure
   * @property {Events} event
   * @property {boolean?} once
   * @property {import("discord.js").Awaitable<(client: import('./SakugaDiscordClient'), ...args: import("discord.js").ClientEvents[Events]) => void>} execute
   * @param {Structure} structure
   */
  constructor(structure) {
    this.data = {
      type: 0,
      ...structure,
    };
  }

  toJSON() {
    return { ...this.data };
  }
};
