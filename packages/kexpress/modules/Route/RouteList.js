class RouteList {
  #routes = [];

  add(route) {
    this.#routes.push(route);
  }

  findRouteByRequest(request, prefix) {
    const findedRoute = this.#routes.find((route) =>
      route.isRouteMatches(request, prefix)
    );

    return (
      findedRoute && [
        findedRoute,
        prefix.concat(findedRoute.url),
      ]
    );
  }
}

module.exports = RouteList;
