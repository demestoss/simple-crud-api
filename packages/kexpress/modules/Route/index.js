const Url = require("../Url");

class Route {
  #url;
  #method;
  #callbacks;

  constructor(urlString, method, callbacks) {
    this.#url = new Url(urlString);
    this.#method = method;
    this.#callbacks = callbacks;
  }

  isRouteMatches(request) {
    if (this.#method !== request.method) return false;
    if (this.#url.isEquals(request.url)) return true;

    return this.#url.haveTheSameParts(request.url);
  }

  executeRouteCallbacks(request, response) {
    this.#callbacks.forEach((callback) => {
      if (response.isFinished()) return;
      callback(request, response);
    });
  }

  get url() {
    return this.#url;
  }
}

module.exports = Route;
