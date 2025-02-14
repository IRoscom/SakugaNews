const { readdirSync } = require("fs");
const { join } = require("path");
const Logger = require("../utils/Logger");
/**
 *
 * @param {import('@Client')} client
 */
module.exports = (client) => {
  readdirSync(join(process.cwd(), "src", "events", "discord")).forEach(
    (folder) => {
      const events = readdirSync(
        join(process.cwd(), "src", "events", "discord", folder)
      ).filter((file) => file.endsWith(".js"));
      for (const file of events) {
        try {
          /**
           * @type {import('../structures/DiscordEvent')['data']}
           */
          const module = require(join(
            process.cwd(),
            "src",
            "events",
            "discord",
            folder,
            file
          ));
          if (!module.event || !module.execute) {
            Logger.error(`Не удалось загрузить ивент: ${file}`, "discord");
            continue;
          }
          if (module?.once) {
            client.once(module.event, (...args) =>
              module.execute(client, ...args)
            );
          } else {
            client.on(module.event, (...args) =>
              module.execute(client, ...args)
            );
          }
          Logger.info(`Загружен новый ивент: ${file}`, "discord");
        } catch (error) {
          Logger.error(error, "discord");
        }
      }
    }
  );
};
