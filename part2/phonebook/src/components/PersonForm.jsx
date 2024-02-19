import { useState } from 'react';

const PersonForm = (props) => {
  const { persons, setPersons } = props;
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  // console.log(persons);

  const addName = (event) => {
    event.preventDefault();
    const personsObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const names = persons.find((person) => person.name === personsObject.name);
    const numbers = persons.find(
      (person) => person.number === personsObject.number
    );

    if (!names && !numbers) {
      setPersons(persons.concat(personsObject));
    } else {
      if (names) alert(`${newName} is already added to phonebook`);
      else if (numbers) alert(`Repeated phone Number`);
    }
    setNewName('');
    setNewNumber('');
  };
  //taking name from the name field
  const handleNameField = (event) => {
    setNewName(event.target.value);
  };
  //taking number from input number field
  const handleNumberField = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <form onSubmit={addName}>
        name: <input onChange={handleNameField} value={newName} required />
        <div>
          number:
          <input onChange={handleNumberField} value={newNumber} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
