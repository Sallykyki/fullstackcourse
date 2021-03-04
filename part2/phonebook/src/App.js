import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import {
  getPersons,
  addPerson,
  deletePerson,
  updateNumber,
} from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilter] = useState("");

  useEffect(() => {
    getPersons().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const isPersonExisted = (person) =>
      person.name.toLowerCase().trim() === newName.toLowerCase().trim();

    if (persons.some(isPersonExisted)) {
      const update = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one`
      );
      if (update) {
        const id = persons.find(isPersonExisted).id;
        updateNumber(id, personObject).then((updatedPerson) => {
          setPersons(
            persons.map((person) => (person.id !== id ? person : updatedPerson))
          );
          setNewName("");
          setNewNumber("");
        });
      }
    } else {
      addPerson(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => error);
    }
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);

    const result = window.confirm(`Delete ${person.name}`);

    if (result) {
      deletePerson(person.id)
        .then(() =>
          getPersons().then((persons) => {
            setPersons(persons);
          })
        )
        .catch((error) => error);
    }
  };

  const handleFilterChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  const personsToShow = persons.filter(
    (person) => person.name.toLowerCase().indexOf(filterName.toLowerCase()) >= 0
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addNewPerson={addNewPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
