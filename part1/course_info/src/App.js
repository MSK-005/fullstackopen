const Header = (course) => {
  //console.log(course)
  return (
    <h1>{course.course}</h1>
  )
}

const Content = (parts) => {
  //console.log(parts)
  return (
    <div>
      <p>{parts.parts[0].name}: {parts.parts[0].exercises}</p>
      <p>{parts.parts[1].name}: {parts.parts[1].exercises}</p>
      <p>{parts.parts[2].name}: {parts.parts[2].exercises}</p>
    </div>
  )
}

const Total = (parts) => {
  return (
    <div>
    <p>Total: {parts.parts[0].exercises + parts.parts[1].exercises + parts.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default App