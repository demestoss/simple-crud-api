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
}

module.exports = new PersonService();
