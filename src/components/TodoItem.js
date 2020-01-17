import classnames from "classnames";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { Component } from "react";
import TodoTextInput from "./TodoTextInput";

export function timeDifferenceShort(time) {
  const msPerSecond = 1000;
  const msPerMinute = 60 * msPerSecond;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;

  const t = dayjs().diff(dayjs(time));

  if (t < msPerMinute) {
    const now = Math.round(t / msPerSecond);
    return `${now}s ago`;
  } else if (t < msPerHour) {
    const now = Math.round(t / msPerMinute);
    return `${now}m ago`;
  } else if (t < msPerDay) {
    const now = Math.round(t / msPerHour);
    return `${now}h ago`;
  } else {
    return `${dayjs(time).format("MM/DD/YYYY hh:mm")}`;
  }
}

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
  };

  state = {
    editing: false
  };

  handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({ editing: false });
  };

  render() {
    const { todo, completeTodo, deleteTodo } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={text => this.handleSave(todo.id, text)}
        />
      );
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => completeTodo(todo.id)}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{ padding: "4px 60px" }}
              onDoubleClick={this.handleDoubleClick}
            >
              {todo.text}
            </label>
            <label style={{ padding: "4px 60px", fontSize: ".825rem" }}>
              {todo.completed ? "Completed @ " : "Added @ "}{" "}
              {timeDifferenceShort(
                todo.completed
                  ? +new Date(todo.completed_at)
                  : +new Date(todo.date)
              )}
            </label>
          </div>
          <button className="destroy" onClick={() => deleteTodo(todo.id)} />
        </div>
      );
    }

    return (
      <li
        className={classnames({
          completed: todo.completed,
          editing: this.state.editing
        })}
      >
        {element}
      </li>
    );
  }
}
