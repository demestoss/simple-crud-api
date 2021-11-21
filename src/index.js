const {
  Server,
  StatusCodes,
} = require("../packages/kexpress");
const { APP_PORT } = require("./config");

const app = new Server();

app.get("/", (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ message: "Hello World" });
});

app.get("/admin/{id}", (req, res) => {
  res.status(StatusCodes.OK).json({ message: req.params });
});

app.notFound((req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ message: "Route was not found" });
});

app.error((req, res, error) => {
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: error.message });
});

app.listen(APP_PORT, () => {
  console.log(
    `Server has been started on port ${APP_PORT}`
  );
});
