const http = require("http");
const { Response } = require("../Response");
const Request = require("../Request");
const httpCodes = require("./constants/httpCodes");
const StatusCodes = require("../constants/StatusCodes");
const Route = require("../modules/Route");
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
    this.#urlMapper.push(new Route(url, method, callbacks));
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
      throw error;
    }
  }

  #requestLoop(req, res) {
    const response = new Response(res);
    const request = new Request(req);

    const findedRoute = this.#urlMapper.find((route) =>
      route.isRouteMatches(request)
    );

    if (!findedRoute)
      return this.#routeNotFound(request, response);

    request.parseParams(findedRoute.url);

    try {
      findedRoute.executeRouteCallbacks(request, response);
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
