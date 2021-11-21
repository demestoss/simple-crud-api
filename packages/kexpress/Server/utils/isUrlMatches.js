const { isParameter } = require("../../utils/urlUtils");

const isUrlMatches = (urlObj, req) => {
  const { url, method } = urlObj;
  if (method !== req.method) return false;
  if (url === req.url) return true;

  const splittedRequestUrl = req.url.split("/");
  const splittedUrl = url.split("/");

  if (splittedRequestUrl.length !== splittedUrl.length) {
    return false;
  }

  return splittedUrl.every((part, idx) => {
    const requestUrlPart = splittedRequestUrl[idx];
    if (!requestUrlPart && requestUrlPart !== "")
      return false;

    return isParameter(part) || requestUrlPart === part;
  });
};

module.exports = isUrlMatches;
