import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationCategory, setNotificationCategory] = useState(null)

const notificationSetting = (message, category) => {
  setNotification(message)
  setNotificationCategory(category)
  
  setTimeout(() => {
    setNotification(null)
    setNotificationCategory(null)
  }, 5000)
}

useEffect(() => {
  //console.log("Effect")
  
  personService
    .getAll()
    .then(response => {
      console.log("Succeeded in loading data from server.")
      setPersons(response.data)
    })
    .catch(() => {
      console.log("Failed to load data from server.")
    })
  }, [])

const findDuplicate = (item, list) => {
  const value = list.find(listItem => listItem.name === item)

  if (value === undefined) {
    return false
  } 
  return true
}

const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filterInput.toLowerCase()))
//console.log(filterPersons)

const addInfo = (event) => {

  event.preventDefault()
  const duplicateExists = findDuplicate(newName, persons)
  //console.log(valid)

  if (!duplicateExists) {

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    personService
      .createData(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        
        notificationSetting(`Added ${newName} successfully`, 'success')
      })
      .catch(() => {
        console.log("Error as expected.")
        notificationSetting(`Error adding ${newName} to the server`, 'error')
      })
  }
  else {
    if (window.confirm(`${newName} is already added to phonebook. Replace the old number with the new one?`)) {
      const person = persons.find(p => p.name === newName)
      person.number = newNumber
      personService
        .updateData(person)
        .then(() => {
          setPersons(persons.map(p => p.id != person.id ? p : person))

          notificationSetting(`Changed ${person.name}'s name successfully`, 'success')
        })
        .catch((error) => {
            console.log(error.status)
            notificationSetting(`${person.name} does not exist in server`, 'error')
            setPersons(persons.filter(p => p.id !== person.id)) 
        })
    }
  }
    setNewName('')
    setNewNumber('')
}

const handlePersonDelete = (person) => {
  console.log(person.id)
  if (window.confirm(`Delete ${person.name}?`)) {
    personService
      .deleteData(person.id)
      .then(() => {
        notificationSetting(`Deleted ${person.name} successfully`, 'success')
      })
  }
  setPersons(persons.filter(p => p.id !== person.id))
  //console.log(persons)
}

const handleFilterChange = (event) => {
  //console.log(event.target.value)
  setFilterInput(event.target.value)
}

const handleNumberChange = (event) => {
  //console.log(event.target.value)
  setNewNumber(event.target.value)
}

const handleNameChange = (event) => {
  //console.log(event.target.value)
  setNewName(event.target.value)
}

return (
  <div>
    <h2>Phonebook</h2>
    <Notification message={notification} category={notificationCategory}/>
    <Filter filterInput={filterInput} handleFilterChange={handleFilterChange}/>

    <h3>Add a new number</h3>
    <PersonForm addInfo={addInfo} 
    newName={newName} 
    newNumber={newNumber} 
    handleNameChange={handleNameChange} 
    handleNumberChange={handleNumberChange}/>
    
    <h3>Numbers</h3>
    <Persons peopleToShow={filterPersons} handlePersonDelete={handlePersonDelete}/>
  </div>
)
}

export default App