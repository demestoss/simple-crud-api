const {
  jsonHeaders,
  plainTextHeaders,
  htmlHeaders,
} = require("./constants/headers");

class Response {
  #httpResponse = null;
  #statusCode = 200;
  #headers = [];

  constructor(res) {
    this.#httpResponse = res;
  }

  #sendResponse(data, headers = []) {
    if (this.isFinished()) return;

    this.#httpResponse.statusCode = this.#statusCode;
    [...this.#headers, ...headers].forEach(
      ([key, value]) => {
        this.#httpResponse.setHeader(key, value);
      }
    );
    this.#httpResponse.end(data);
  }

  isFinished() {
    return this.#httpResponse.writableEnded;
  }

  status(status) {
    this.#statusCode = status;
    return this;
  }

  setHeader(key, value) {
    this.#headers.push([key, value]);
    return this;
  }

  send(data) {
    this.#sendResponse(data, plainTextHeaders);
  }

  json(data) {
    this.#sendResponse(JSON.stringify(data), jsonHeaders);
  }

  html(data) {
    this.#sendResponse(data, htmlHeaders);
  }
}

module.exports = Response;
