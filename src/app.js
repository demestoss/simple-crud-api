const Server = require("../packages/kexpress/Server");
const StatusCodes = require("./constants/StatusCodes");
const personRouter = require("./modules/person/person.routes");
const notFoundHandler = require("./modules/notFound");
const errorHandler = require("./modules/error");
const { IncorrectTypeValidationError } = require("./modules/error/errorTypes");
const { RequiredValidationError } = require("./modules/error/errorTypes");

class App {
  #kexpressApp;

  constructor() {
    this.#kexpressApp = new Server();
    this.#applyRouters();
    this.#applyHandlers();
  }

  #applyRouters() {
    this.#kexpressApp.use(personRouter());
  }

  #applyHandlers() {
    this.#kexpressApp.notFound(notFoundHandler);
    this.#kexpressApp.error(errorHandler);
  }

  run(port) {
    this.#kexpressApp.listen(port, () => {
      console.log(`Server has been started on port ${port}`);
    });
  }
}

module.exports = App;
