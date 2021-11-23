const http = require("http");
const { Response } = require("../Response");
const Request = require("../Request");
const Router = require("../modules/Router");
const RouterList = require("../modules/Router/RouterList");
const { HOST } = require("../config");

class Server {
  #routerList = new RouterList();
  #defaultRouter = new Router("");
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

  use(router) {
    this.#routerList.push(router);
  }

  get(url, ...args) {
    this.#defaultRouter.get(url, ...args);
  }

  post(url, ...args) {
    this.#defaultRouter.post(url, ...args);
  }

  put(url, ...args) {
    this.#defaultRouter.put(url, ...args);
  }

  patch(url, ...args) {
    this.#defaultRouter.patch(url, ...args);
  }

  delete(url, ...args) {
    this.#defaultRouter.delete(url, ...args);
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
      throw new Error("Route was not found");
    }
  }

  #applicationError(request, response, error) {
    if (this.#errorCallback) {
      this.#errorCallback(request, response, error);
    } else {
      throw error;
    }
  }

  #findRoute(request) {
    return (
      this.#routerList.findRouteByRequest(request) ||
      this.#defaultRouter.findRouteByRequest(request)
    );
  }

  async #requestLoop(req, res) {
    const response = new Response(res);
    const request = new Request(req);

    try {
      const data = this.#findRoute(request);

      if (!data)
        return this.#routeNotFound(request, response);

      const [findedRoute, fullUrl] = data;

      await request.parseBody();
      request.parseParams(fullUrl);

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
