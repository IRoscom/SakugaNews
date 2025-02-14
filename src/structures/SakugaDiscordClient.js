const { Client } = require("discord.js");
const LoadEvents = require("../services/LoadDiscordEvents");
const Logger = require("../utils/Logger");

module.exports = class SakugaDiscordClient extends Client {
  /**
   *
   * @param {import("discord.js").ClientOptions} options
   */
  constructor(options) {
    super(options);
    /**
     * @type {import('./SakugaTelegramClient')}
     */
    this.telegram = null;
    this.logger = Logger;
  }

  _launch(telegramClient) {
    LoadEvents(this);
    this.telegram = telegramClient;
    this.login(process.env.DiscordToken);
  }
};
