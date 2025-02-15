const mongoose = require("mongoose");
const Logger = require("../utils/Logger");

module.exports = (dbUrl) => {
  /**
   * @type {import('mongoose').ConnectOptions}
   */
  const dbOptions = {
    dbName: "SakugaNews",
    socketTimeoutMS: 1000,
  };
  mongoose.connection.on("connected", () =>
    Logger.info("Соединение установлено", "Mongoose")
  );
  mongoose.connection.on("disconnected", () =>
    Logger.warn("Соединение разорвано", "Mongoose")
  );
  mongoose.connection.on("error", (err) => {
    Logger.error(`Произошла ошибка: ${err}`, "Mongoose");
    console.error(err);
  });
  mongoose.connect(dbUrl, dbOptions);
};
