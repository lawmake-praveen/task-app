import React from "react";

const Task = ({
  task,
  index,
  update,
  handleDelete,
  handleToggle,
  handleEdit,
}) => {
  return (
    <div key={task.id} className="task">
      {update == 0 ? <p>{index + 1}.</p> : <div></div>}
      <input
        type="checkbox"
        className="checkbox"
        checked={task.status}
        onChange={(event) => handleToggle(task.id)}
      />
      <p
        onClick={(e) => handleToggle(task.id)}
        className="task-text"
        style={{
          textDecoration: `${task.status ? "line-through" : "none"}`,
        }}
      >
        {task.name}
      </p>
      <input
        type="button"
        value="Update"
        className="btn"
        onClick={(event) => handleEdit(task)}
      />
      <input
        type="button"
        value="Delete"
        className="btn delete-btn"
        onClick={(event) => handleDelete(task.id)}
      />
    </div>
  );
};

export default Task;
