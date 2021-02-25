import React from "react";

const Persons = (props) => {
  return (
    <>
      {props.personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => props.handleDelete(person.id)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default Persons;
