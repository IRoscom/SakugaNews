const { TelegramClient } = require("telegramsjs");
const LoadEvents = require("../services/LoadTelegramEvents");
const Logger = require("../utils/Logger");

module.exports = class SakugaTelegramClient extends TelegramClient {
  constructor() {
    super(process.env.TelegramToken);
    /**
     * @type {import('./SakugaDiscordClient')}
     */
    this.discord = null;
    this.logger = Logger;
  }

  _launch(discordClient) {
    LoadEvents(this);
    this.discord = discordClient;
    this.login();
  }
};
