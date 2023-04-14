import React, { Component } from "react";

//  Components
import TaskCard from "../components/taskCard";
import Button from "../components/button";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      task: "",
      taskList: [],
    };
  }

  componentDidMount = () => {
    console.log("Mounting executed!");
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.taskList !== prevState.taskList) {
      console.log("Updated!");
    }
  };

  deleteTask = (index) => {
    const newTaskList = structuredClone(this.state.taskList);
    newTaskList.splice(index, 1);
    this.setState({ taskList: newTaskList });
  };
  handleDelete = (event) => {
    event.preventDefault();
    this.setState({
      taskList: [...this.state.taskList, this.state.task],
      task: "",
    });
  };
  render() {
    console.log("Home rendered!!");
    return (
      <div className="container">
        <h2 className="main-wrapper">TODO</h2>

        <form action="" className="todo-form w-100 d-flex">
          <input
            type="text"
            className="w-100"
            onChange={(event) => {
              this.setState({ task: event.target.value });
            }}
            value={this.state.task}
          />
          <Button
            handleClick={this.handleDelete}
            title="Add Task"
            disabled={!this.state.task}
          />
        </form>

        <ul className="mt-4">
          {this.state.taskList.map((item, index) => (
            <TaskCard task={item} count={index} deleteTask={this.deleteTask} />
          ))}
        </ul>
      </div>
    );
  }
}
