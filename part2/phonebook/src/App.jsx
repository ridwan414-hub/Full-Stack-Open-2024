import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([ ]);
  useEffect(() => {
    axios.get('http://localhost:3002/persons').then((response) => {
    setPersons(response.data);
    });
  }, []);
  // console.log('render', data.length, 'notes');

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        persons={persons}
        setPersons={setPersons}
      ></Filter>

      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons}></PersonForm>

      <h2>Numbers</h2>

      {persons.map((person) => (
        <Persons
          key={person.id}
          name={person.name}
          setPersons={setPersons}
          number={person.number}
        ></Persons>
      ))}
    </div>
  );
};

export default App;
