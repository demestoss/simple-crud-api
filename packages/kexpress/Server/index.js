const http = require("http");
const { Response } = require("../Response");
const Request = require("../Request");
const httpCodes = require("./constants/httpCodes");
const StatusCodes = require("../constants/StatusCodes");
const { isUrlMatches } = require("./utils");
const { formatUrl } = require("../utils/urlUtils");
const { HOST } = require("../config");

class Server {
  #urlMapper = [];
  #notFoundCallback = null;
  #errorCallback = null;

  constructor() {
    this.server = http.createServer(
      this.#requestLoop.bind(this)
    );
  }

  listen(port, callback) {
    this.server.listen(port, HOST, callback);
  }

  #register(url, method, callbacks) {
    const formattedUrl = formatUrl(url);

    this.#urlMapper.push({
      url: formattedUrl,
      method,
      callbacks,
    });
  }

  get(url, ...args) {
    this.#register(url, httpCodes.GET, args);
  }

  post(url, ...args) {
    this.#register(url, httpCodes.POST, args);
  }

  put(url, ...args) {
    this.#register(url, httpCodes.PUT, args);
  }

  patch(url, ...args) {
    this.#register(url, httpCodes.PATCH, args);
  }

  delete(url, ...args) {
    this.#register(url, httpCodes.DELETE, args);
  }

  notFound(callback) {
    this.#notFoundCallback = callback;
  }

  error(callback) {
    this.#errorCallback = callback;
  }

  #routeNotFound(request, response) {
    if (this.#notFoundCallback) {
      this.#notFoundCallback(request, response);
    } else {
      response.status(StatusCodes.NOT_FOUND).json({
        message: "Route not found",
      });
    }
  }

  #applicationError(request, response, error) {
    if (this.#errorCallback) {
      this.#errorCallback(request, response, error);
    } else {
      response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message: "Something went wrong",
        });
    }
  }

  #requestLoop(req, res) {
    const response = new Response(res);
    const request = new Request(req);

    const finded = this.#urlMapper.find((el) =>
      isUrlMatches(el, request)
    );

    if (!finded)
      return this.#routeNotFound(request, response);

    request.parseParams(finded.url);

    try {
      finded.callbacks.forEach((callback) => {
        if (response.isFinished()) return;
        callback(request, response);
      });
    } catch (e) {
      this.#applicationError(request, response, e);
    }

    if (!response.isFinished()) {
      throw new Error(
        "Response was not send to the client. Something went wrong"
      );
    }
  }
}

module.exports = Server;
