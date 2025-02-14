/**
 * @template {keyof import("telegramsjs").EventHandlers} Events
 */
module.exports = class TelegramEvent {
  data;
  /**
   * @typedef {Object} Structure
   * @property {Events} event
   * @property {boolean?} once
   * @property {import("telegramsjs").Awaitable<(client: import('./SakugaTelegramClient'), ...args: import("telegramsjs").EventHandlers[Events]) => void>} execute
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
