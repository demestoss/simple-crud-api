const url = require("url");
const Url = require("../modules/Url");

class Request {
  #httpRequest = null;
  #url;

  method = "";
  params = {};
  query = {};
  body = {};

  constructor(req) {
    this.#httpRequest = req;
    this.#parseUrl();
    this.method = this.#httpRequest.method;
  }

  #parseUrl() {
    const parsedUrl = url.parse(
      this.#httpRequest.url,
      true
    );
    this.query = parsedUrl.query;
    this.#url = new Url(parsedUrl.pathname);
  }

  parseParams(routeUrl) {
    this.params = routeUrl.getUrlParams(this.#url);
  }

  get url() {
    return this.#url;
  }
}

module.exports = Request;
