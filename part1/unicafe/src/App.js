import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <>  
      <td>{text}</td> 
      <td>{value}</td>
    </>
  )
}

const Statistics = ({good, neutral, bad, total}) => {
  if (total <= 0)
  {
    return (
      <p>
        No data entries made.
      </p>
    )
  }
 
  const average = (good + (-1 * bad)) / total
  const positivePercent = (good / total) * 100

  return (
    <table>
      <tbody>
        <tr>
          <StatisticLine text="Good" value={good} />
        </tr>
        <tr>
          <StatisticLine text="Neutral" value={neutral} />
        </tr>
        <tr>
          <StatisticLine text="Bad" value={bad} />
        </tr>
        <tr>
          <StatisticLine text="All" value={total} />
        </tr>
        <tr>
          <StatisticLine text="Average" value={average} />
        </tr>
        <tr>
          <StatisticLine text="Positive" value={positivePercent.toString().concat("%")} />
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="Bad"/>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App