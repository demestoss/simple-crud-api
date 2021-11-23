const PersonService = require("./person.service");

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

  getPersonById(req, res) {}

  updatePerson(req, res) {}

  deletePerson(req, res) {}
}

module.exports = new PersonController();
