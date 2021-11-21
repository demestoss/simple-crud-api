const url = require("url");
const {
  formatUrl,
  isParameter,
} = require("../utils/urlUtils");

class Request {
  #httpRequest = null;

  method = "";
  url = "";
  params = {};
  query = {};
  body = {};

  constructor(req) {
    this.#httpRequest = req;
    this.parseUrl();
    this.method = this.#httpRequest.method;
  }

  parseUrl() {
    const parsedUrl = url.parse(
      this.#httpRequest.url,
      true
    );
    this.query = parsedUrl.query;
    this.url = formatUrl(parsedUrl.pathname);
  }

  parseParams(definedUrl) {
    const httpUrl = this.url.split("/");

    definedUrl.split("/").forEach((part, idx) => {
      if (isParameter(part)) {
        const name = part.slice(1, -1);
        this.params[name] = httpUrl[idx];
      }
    });
  }
}

module.exports = Request;
