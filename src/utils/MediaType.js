/**
 *
 * @param {String} contentType
 */
module.exports = (contentType) => {
  const type = contentType.split("/");
  switch (type[0]) {
    case "video":
      return "video";
    case "image":
      return "photo";
    case "audio":
      return "audio";
    default:
      return "photo";
  }
};
