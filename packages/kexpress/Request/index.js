const url = require("url");
const Url = require("../modules/Url");
const httpMethods = require("../modules/Router/constants/httpMethods");

class Request {
  #httpRequest = null;
  #url;

  #method = "";
  #params = {};
  #query = {};
  #body = {};

  constructor(req) {
    this.#httpRequest = req;
    this.#parseUrl();

    this.#method = this.#httpRequest.method;
  }

  #parseUrl() {
    const parsedUrl = url.parse(this.#httpRequest.url, true);
    this.#query = parsedUrl.query;
    this.#url = new Url(parsedUrl.pathname);
  }

  async parseBody() {
    if (
      [httpMethods.POST, httpMethods.PUT, httpMethods.PATCH].includes(
        this.#method
      )
    ) {
      const buffers = [];
      for await (const chunk of this.#httpRequest) {
        buffers.push(chunk);
      }
      const data = Buffer.concat(buffers).toString();

      try {
        this.#body = JSON.parse(data);
      } catch (e) {
        this.#body = {};
        console.error("Cannot parse request body. Invalid JSON data");
      }
    }
  }

  parseParams(routeUrl) {
    this.#params = routeUrl.getUrlParams(this.#url);
  }

  get url() {
    return this.#url;
  }

  get method() {
    return this.#method;
  }

  get params() {
    return this.#params;
  }

  get query() {
    return this.#query;
  }

  get body() {
    return this.#body;
  }
}

module.exports = Request;
