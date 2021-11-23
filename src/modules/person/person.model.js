const { v4: uuidv4 } = require("uuid");

const PersonModel = ({ name, age, hobbies }) => ({
  id: uuidv4(),
  name,
  age,
  hobbies,
});

module.exports = PersonModel;
