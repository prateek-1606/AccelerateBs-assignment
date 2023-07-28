import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

function TaskList({ tasks, index, removeTask }) {
  return (
    <div className="tasks">
      <span className="me-4">{tasks.time} Hours</span>
      <span>{tasks.text}
      <Button style={{marginLeft:'5px'}} variant="outline-danger" onClick={() => removeTask(index)}>
          ✕
        </Button>
      </span>
    </div>
  );
}

function TaskForm({ addTask }) {
  const [value, setValue] = React.useState("");
  const [time, setTime] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(value, time);
    setValue("");
    setTime("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <b>Add Tasks</b>
        </Form.Label>
        <Form.Control
          required
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add new task"
        />
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>
          <b>Add Time</b>
        </Form.Label>
        <Form.Control
          required
          type="number"
          className="input"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Add Hours"
        />
      </Form.Group>
      <Button variant="primary mb-5 mt-3" type="submit">
        Submit
      </Button>
    </Form>
  );
}

function Tasks() {
  const params = useParams();
  const { id } = params;

  const projects = JSON.parse(localStorage.getItem("projects"));
  console.log("ppp", projects);

  const [tasks, setTasks] = React.useState([
    {
      text: "This is a sampe tasks",
      time: 2,
      isDone: false,
    },
  ]);

  const addTask = (text, time) => {
    let myProject = projects.filter((el) => el.id === id);
    console.log(">>>", myProject);
    const newTodos = [...tasks, { text, time: parseInt(time) }];
    setTasks(newTodos);
  };

  const removeTask = (index) => {
    const newTodos = [...tasks];
    newTodos.splice(index, 1);
    setTasks(newTodos);
  };
  const totalTime = (array1) => {
    const sum = array1.reduce(
      (accumulator, currentValue) => accumulator + currentValue.time,
      0
    );
    return sum;
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Task List</h1>
        <TaskForm addTask={addTask} />
        <div>
          {tasks.map((tasks, index) => (
            <Card key={index} className="my-4">
              <Card.Body>
                <TaskList
                  index={index}
                  tasks={tasks}
                  removeTask={removeTask}
                />
              </Card.Body>
            </Card>
          ))}
          {tasks.length > 0 && (
            <div>
              <Card className="my-4">
                <Card.Body>Total {totalTime(tasks)} Hours</Card.Body>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
