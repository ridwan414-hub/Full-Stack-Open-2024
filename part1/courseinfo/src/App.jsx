const Header = (props) => {
  // console.log(props);
  return (
    <div>
      <p>{props.course.name}</p>
    </div>
  );
};
const Part = (props) => {
  // console.log(props)
  return (
    <div>
      <p>
        {props.data.name} {props.data.exercises}
      </p>
    </div>
  );
};

const Content = (props) => {
  // console.log(props);
  const datainArrays = props.data;
  console.log(datainArrays);

  return (
    <div>
      {datainArrays.map((value, index) => (
        <Part key={index} data={value}></Part>
      ))}

      {/* <Part data={props.data[0]}></Part>
      <Part data={props.data[1]}></Part>
      <Part data={props.data[2]}></Part> */}
    </div>
  );
};

const Total = (props) => {
  // console.log(props.data);
  const [course1, course2, course3] = props.data;
  // console.log(course1, course2, course3);
  const totalExercise =
    course1.exercises + course2.exercises + course3.exercises;
  // console.log(totalExercise);
  return (
    <div>
      <p>Total Number of exercises {totalExercise}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course}></Header>
      <Content data={course.parts}></Content>
      <Total data={course.parts}></Total>
    </div>
  );
};

export default App;
