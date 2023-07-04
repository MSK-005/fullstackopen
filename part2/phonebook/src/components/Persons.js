const PersonInfo = ({person, handlePersonDelete}) => {
  return (
    <>
      <p>{person.name} {person.number}</p>
      <button onClick={() => handlePersonDelete(person)}>Delete</button>
    </>
  )
}

const Persons = ({peopleToShow, handlePersonDelete}) => {
  //console.log(peopleToShow)
  return (
    <div>
      {peopleToShow.map((person) => (
      <PersonInfo key={person.id} person={person} handlePersonDelete={handlePersonDelete}/>
    ))}
  </div>
  )
}

export default Persons