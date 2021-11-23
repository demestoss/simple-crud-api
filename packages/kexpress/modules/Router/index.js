const httpMethods = require("./constants/httpMethods");
const RouterList = require("./RouterList");
const RouteList = require("../Route/RouteList");
const Route = require("../Route");
const Url = require("../Url");

class Router {
  #prefix = new Url("");
  #routes = new RouteList();
  #routerList = new RouterList();

  constructor(prefix) {
    this.#prefix = new Url(prefix);
  }

  addPrefix(prefix) {
    this.#prefix = prefix.concat(this.#prefix);
    return this;
  }

  #findInOwnRoutes(request) {
    return this.#routes.findRouteByRequest(
      request,
      this.#prefix
    );
  }

  #findInChildRouters(request) {
    return this.#routerList.findRouteByRequest(request);
  }

  findRouteByRequest(request) {
    if (!request.url.startsWith(this.#prefix)) return null;

    return (
      this.#findInChildRouters(request) ||
      this.#findInOwnRoutes(request)
    );
  }

  #register(url, method, callbacks) {
    this.#routes.add(
      new Route(url, method, callbacks, this.#prefix)
    );
  }

  use(router) {
    this.#routerList.push(router.addPrefix(this.#prefix));
  }

  get(url, ...args) {
    this.#register(url, httpMethods.GET, args);
  }

  post(url, ...args) {
    this.#register(url, httpMethods.POST, args);
  }

  put(url, ...args) {
    this.#register(url, httpMethods.PUT, args);
  }

  patch(url, ...args) {
    this.#register(url, httpMethods.PATCH, args);
  }

  delete(url, ...args) {
    this.#register(url, httpMethods.DELETE, args);
  }
}

module.exports = Router;
