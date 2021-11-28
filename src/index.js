const App = require("./app");
const { APP_PORT } = require("./config");

const app = new App();
app.run(APP_PORT);
