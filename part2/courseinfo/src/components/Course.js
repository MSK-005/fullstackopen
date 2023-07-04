const Total = ({parts}) => {
  //console.log(parts)
  const total = parts.reduce(
      (accumulator, indexValue) => {
          return(accumulator + indexValue.exercises)
      }, 0)
   
  return (
      <p>A total of {total} exercises.</p>
  )
}

const Part = ({part}) => {
  return (
    <li>
      {part.name}: {part.exercises}
    </li>
  )
}

const Content = ({info}) => {
  //console.log(info)
    return (
      <>
        <ul>
          {info.map((part) => {
            //console.log(part)
            return (
                <Part key={part.id} part={part}/>
                )
          })}
        </ul>
        <Total parts={info}/>
      </>
    )
}

const Header = ({name}) => {
  return (
    <h2>{name}</h2>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content info={course.parts}/>
    </div>
  )
}

export default Course