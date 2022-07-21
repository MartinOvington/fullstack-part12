import React from 'react';

const Person = ({ name, number, pressDelete }) => (
  <div>
    {name} {number}
    <button onClick={() => pressDelete(name)}>delete</button>
  </div>
);

export default Person;
