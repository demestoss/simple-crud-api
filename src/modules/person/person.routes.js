const Router = require("../../../packages/kexpress/modules/Router");
const StatusCodes = require("../../constants/StatusCodes");

module.exports = () => {
  const router = new Router("/person");

  router.get("/", (req, res) => {
    res
      .status(StatusCodes.OK)
      .json({ message: "Get persons" });
  });

  router.post("/", (req, res) => {
    res.status(StatusCodes.OK).json({ message: req.body });
  });

  router.get("/{personId}", (req, res) => {
    res
      .status(StatusCodes.OK)
      .json({ message: req.params.personId });
  });

  router.put("/{personId}", (req, res) => {
    res
      .status(StatusCodes.OK)
      .json({ message: req.params.personId });
  });

  router.delete("/{personId}", (req, res) => {
    res
      .status(StatusCodes.OK)
      .json({ message: req.params.personId });
  });

  const sub = new Router("/sub");
  sub.get("/", (req, res) => {
    res
      .status(StatusCodes.OK)
      .json({ message: "Get SUBperson" });
  });

  router.use(sub);

  return router;
};
