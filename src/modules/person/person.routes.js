const Router = require("../../../packages/kexpress/modules/Router");
const PersonController = require("./person.controller");
const PersonValidator = require("./person.validator");

module.exports = () => {
  const router = new Router("/person");

  router.get("/", PersonController.getPersons);
  router.post("/", PersonValidator.validateDto, PersonController.createPerson);
  router.get("/{personId}", PersonController.getPersonById);
  router.put("/{personId}", PersonController.updatePerson);
  router.delete("/{personId}", PersonController.deletePerson);

  return router;
};
