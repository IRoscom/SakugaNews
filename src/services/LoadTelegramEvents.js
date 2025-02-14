const { readdirSync } = require("fs");
const { join } = require("path");
const Logger = require("../utils/Logger");
/**
 *
 * @param {import('@Client')} client
 */
module.exports = (client) => {
  readdirSync(join(process.cwd(), "src", "events", "telegram")).forEach(
    (folder) => {
      const events = readdirSync(
        join(process.cwd(), "src", "events", "telegram", folder)
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
            "telegram",
            folder,
            file
          ));
          if (!module.event || !module.execute) {
            Logger.error(`Не удалось загрузить ивент: ${file}`, "telegram");
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
          Logger.info(`Загружен новый ивент: ${file}`, "telegram");
        } catch (error) {
          Logger.error(error, "telegram");
        }
      }
    }
  );
};
