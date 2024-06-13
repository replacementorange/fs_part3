// Person
// Returns person's name & number
const Person = ({ name, number, deletePerson }) => {
    return(
      <>
      <p>{name} {number} <button onClick={deletePerson}>delete</button></p>
      </>
    )
  }

// Displays persons in list 
const Persons = ({ displayPerson, deletePerson }) => {
    return(
        <>
            {displayPerson.map(person => <Person 
                               key={person.id}
                               name={person.name}
                               number={person.number}
                               deletePerson={() => deletePerson(person.id)}/>)}
        </>
    )
}

export default Persons