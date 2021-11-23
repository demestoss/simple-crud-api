const PersonModel = require("./person.model");

class PersonService {
  #persons = [
    PersonModel({ name: "John", age: 23, hobbies: ["none"] }),
    PersonModel({ name: "Jack", age: 12, hobbies: ["guitar", "else"] }),
  ];

  getAllPersons() {
    return this.#persons;
  }

  createPerson(personDto) {
    const person = PersonModel(personDto);
    this.#persons.push(person);
    return person;
  }

  getPersonById(personId) {
    return this.#persons.find((person) => person.id === personId);
  }

  updatePersonById(personId, personDto) {}
}

module.exports = new PersonService();
