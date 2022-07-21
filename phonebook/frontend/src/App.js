import React, { useState, useEffect } from 'react';
import FilterPeople from './components/filterpeople';
import PersonForm from './components/personform';
import Filter from './components/filter';
import Notification from './components/notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [myFilter, setFilter] = useState('');
  const [msgType, setMsgType] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const id = persons.find((person) => person.name === newName).id;
        personService
          .update(id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons
                .filter((person) => person.name !== newName)
                .concat(returnedPerson)
            );
            setNewName('');
            setNewNumber('');
            setMsgType('updateMsg');
            setMessage(`Updated ${newName}'s number`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.log(error.response.data);
            setMsgType('errorMsg');
            if (
              error.response.data.error.search(
                /(validation failed)|(duplicate)/i
              ) >= 0
            ) {
              setMessage(error.response.data.error);
            } else {
              setMessage(
                `Information of ${newName} has already been removed from server`
              );
            }
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setMsgType('updateMsg');
          setMessage(`Added ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data);
          setMsgType('errorMsg');
          if (
            error.response.data.error.search(
              /(validation failed)|(duplicate)/i
            ) >= 0
          ) {
            setMessage(error.response.data.error);
          } else {
            setMessage(
              `Information of ${newName} has already been removed from server`
            );
          }
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };

  const pressDelete = (name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      const id = persons.find((person) => person.name === name).id;
      personService
        .deleteId(id)
        .then((result) => {
          if (result) {
            setPersons(persons.filter((person) => person.id !== id));
          }
        })
        .catch(() => {
          setMsgType('errorMsg');
          setMessage(
            `Information of ${name} has already been removed from server`
          );
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} msgType={msgType} />
      <Filter myFilter={myFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        func={addPerson}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <FilterPeople
        persons={persons}
        name={myFilter}
        pressDelete={pressDelete}
      />
    </div>
  );
};

export default App;
