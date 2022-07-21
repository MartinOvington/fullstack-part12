import React from 'react';
import Person from './person';

const FilterPeople = ({ name, persons, pressDelete }) => {
  return persons
    .filter((person) => person.name.toLowerCase().includes(name.toLowerCase()))
    .map((person) => (
      <Person
        key={person.name}
        name={person.name}
        number={person.number}
        pressDelete={pressDelete}
      />
    ));
};

export default FilterPeople;
