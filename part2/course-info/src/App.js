const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => {
  const sumExcesices = sum.reduce((acc, el) => {
    return (acc += el.exercises);
  }, 0);
  return <p>Total exercises: {sumExcesices}</p>;
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return parts.map((part) => {
    return <Part key={part.id} part={part} />;
  });
};

const Course = (props) => {
  return (
    <>
      <Header course={props.courseName} />
      <Content parts={props.parts} />
      <Total sum={props.sum} />
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return courses.map((course) => {
    return (
      <Course
        key={course.id}
        courseName={course.name}
        parts={course.parts}
        sum={course.parts}
      />
    );
  });
};

export default App;
