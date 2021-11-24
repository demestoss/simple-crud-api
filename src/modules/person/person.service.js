const PersonRepository = require("./person.repository");

class PersonService {
  getAllPersons() {
    return PersonRepository.getAll();
  }

  createPerson(personDto) {
    return PersonRepository.create(personDto);
  }

  getPersonById(personId) {
    return PersonRepository.getById(personId);
  }

  updatePersonById(personId, personDto) {
    return PersonRepository.update(personId, personDto);
  }

  deletePersonById(personId) {
    return PersonRepository.delete(personId);
  }
}

module.exports = new PersonService();
