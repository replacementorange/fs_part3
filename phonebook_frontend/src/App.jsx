import { useState, useEffect } from 'react'
import axios from 'axios'
// importing components
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import Notification from './components/Notification'
// importing services
import personService from './services/persons'
// css file
import './index.css'

// Main app
const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
        setPersons(initialPersons)
        })
      }, [])

  // Add new person
  const addPerson = (event) => {
        event.preventDefault()    
        const personObject = {
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        }
        // Checking if there is same person
        if (!persons.filter(p => p.name === newName).length) {
          personService
            .create(personObject)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
            })
        addedPersonNotification(newName)
        }
        else {
          alert(`${newName} is already added to phonebook`);
        }
  }

  // Person added notification
  const addedPersonNotification = (name) => {
    setErrorMessage(`Added ${name}`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const displayPerson = newFilter ? persons.filter(person => person.name.toLowerCase().search(newFilter.toLowerCase()) !== -1) : persons

  // Delete person
  const deletePerson = (id) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
    if (window.confirm(`Delete ${persons.filter(person => person.id === id)[0].name}?`)) {
      personService.axiosDelete(id)
      personService.getAll().then(initialPersons => {setPersons(initialPersons)})
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
            <Notification message={errorMessage} />

      <Filter
        setNewFilter={setNewFilter}
        handleFilterChange={handleFilterChange}
      />

      <h2>add a new</h2>

      <Form
        addPerson = {addPerson}
        newName = {newName}
        handlePersonChange = {handlePersonChange}
        newNumber = {newNumber}
        handleNumberChange = {handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons displayPerson={displayPerson}
               deletePerson={deletePerson}/>

    </div>
  )
}

export default App