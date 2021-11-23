const PersonService = require("./person.service");
const { NotFoundError } = require("../error/errorTypes");

class PersonController {
  getPersons(req, res) {
    const persons = PersonService.getAllPersons();
    res.status(200).json(persons);
  }

  createPerson(req, res) {
    const personDto = req.body;
    const personModel = PersonService.createPerson(personDto);
    res.status(200).json(personModel);
  }

  getPersonById(req, res) {
    const { personId } = req.params;
    const person = PersonService.getPersonById(personId);

    if (!person) {
      throw new NotFoundError("Person");
    }

    res.status(200).json(person);
  }

  updatePerson(req, res) {
    const { personId } = req.params;
    const personDto = req.body;
    const personModel = PersonService.updatePersonById(personId, personDto);
    res.status(200).json(personModel);
  }

  deletePerson(req, res) {}
}

module.exports = new PersonController();
