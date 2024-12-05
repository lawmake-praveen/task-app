import React from "react";

const InputArea = (props) => {
  return (
    <form
      className="header"
      onSubmit={props.update != 0 ? props.handleUpdate : props.handleSubmit}
    >
      <input
        type="text"
        placeholder="Task"
        required
        autoFocus
        className="input"
        value={props.newTask.task}
        onChange={(event) =>
          props.setNewTask({ ...props.newTask, task: event.target.value })
        }
      />
      <input
        type="checkbox"
        checked={props.newTask.status}
        className="checkbox"
        onChange={(event) =>
          props.setNewTask({
            ...props.newTask,
            status: !props.newTask.status,
          })
        }
      />
      {props.update != 0 ? (
        <div>
          <input type="submit" value="Update" className="btn submit-btn" />
          <input
            type="button"
            value="Cancel"
            onClick={props.cancelUpdate}
            className="btn submit-btn"
          />
        </div>
      ) : (
        <input type="submit" value="Submit" className="btn submit-btn" />
      )}

      <input
        type="button"
        value="Clear"
        onClick={(event) => props.setNewTask({ task: "", status: false })}
        className="btn submit-btn"
      />
      <input
        type="button"
        value="Delete all tasks"
        onClick={props.handleDeleteAll}
        className="btn delete-all-btn"
      />
    </form>
  );
};

export default InputArea;
