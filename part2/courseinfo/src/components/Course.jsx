//Course
const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name}></Header>
      <Content parts={course.parts}></Content>
    </div>
  );
};
//Course_Header
const Header = ({ name }) => {
  return <h2>{name}</h2>;
};
//Course_content
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises}></Part>
      ))}
      <Total parts={parts}></Total>
    </div>
  );
};

//Course_Parts_name&exercises
const Part = ({ name, exercises }) => {
  return (
    <div>
      {name} {exercises}
    </div>
  );
};
//Total_Exercise
const Total = ({ parts }) => {
  let sum = 0;
  for (let i = 0; i < parts.length; i++) {
    sum = sum + parts[i].exercises;
  }
  return <h3>total of {sum} exercises</h3>;
};

export default Course;
