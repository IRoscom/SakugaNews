const { Schema, model } = require("mongoose");

const messageShema = new Schema({
  discordMessage: { type: String, required: true },
  telegramMessage: { type: String, required: true },
});

module.exports = model("message", messageShema);
