const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Content = (props) => {
  console.log(props.parts[0])
  return (
    <div>
      <Part name = {props.parts[0].name} exercises = {props.parts[0].exercises}/>
      <Part name = {props.parts[1].name} exercises = {props.parts[1].exercises}/>
      <Part name = {props.parts[2].name} exercises = {props.parts[2].exercises}/>     
    </div> 
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.sumEx}</p>
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
  const sumEx = course.parts.reduce((acc,el) => {
    return acc + el.exercises
  },0)

  return (
    <div>
      <Header course = {course.name}/>
      <Content parts = {course.parts}/>
      <Total sumEx = {sumEx}/>
    </div>
  )
}

//part1 = {part1} part2 = {part2} part3 = {part3} exercises1 = {exercises1} exercises2 = {exercises2} exercises3 = {exercises3}

export default App
