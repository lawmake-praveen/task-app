import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [newTask, setNewTask] = useState({
    task: "",
    status: false,
  });
  const [update, setUpdate] = useState(0);
  const [tasks, setTasks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const date = new Date();
      const body = {
        task: newTask.task,
        status: newTask.status,
        createdAt: `${date.toISOString().slice(0, 19).replace("T", " ")}`,
      };
      console.log(`Send body : ${JSON.stringify(body)}`);

      const response = await fetch("http://localhost:3307/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      console.log(`response for add task : ${response.status}`);
      if (response.ok) {
        await getTasks();
        setNewTask({
          task: "",
          status: false,
        });
      }
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  };

  const getTasks = async () => {
    const response = await fetch("http://localhost:3307/getTasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setTasks(data.data);
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  const handleToggle = async (id) => {
    console.log(`status : ${status} : ${id}`);
    try {
      const response = await fetch(
        `http://localhost:3307/toggleCheckBox/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        await getTasks();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3307/deleteTask/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(`response : ${response.status}`);
      if (response.ok) {
        await getTasks();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {}
  };

  const handleDeleteAll = async () => {
    try {
      const response = await fetch(`http://localhost:3307/deleteAllTasks`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        await getTasks();
      } else {
        const data = await response.json();
        console.log(`data : ${data}`);
        alert(`${data.message}`);
      }
    } catch (error) {}
  };

  const handleEdit = async (task) => {
    const editTasks = tasks.filter((currentTask) => currentTask.id != task.id);
    setTasks(editTasks);
    setNewTask({ task: task.name, status: task.status });
    setUpdate(task.id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const body = {
        id: update,
        task: newTask.task,
        status: newTask.status,
      };

      const response = await fetch("http://localhost:3307/updateTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      console.log(`response for add task : ${response.status}`);
      if (response.ok) {
        await getTasks();
        setUpdate(0);
        setNewTask({
          task: "",
          status: false,
        });
      }
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  };

  const cancelUpdate = () => {
    setNewTask({ task: "", status: false });
    setUpdate(0);
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <section className="app">
      <h1>Task App</h1>
      <form
        className="header"
        onSubmit={update != 0 ? handleUpdate : handleSubmit}
      >
        <input
          type="text"
          placeholder="Task"
          required
          autoFocus
          className="input"
          value={newTask.task}
          onChange={(event) =>
            setNewTask({ ...newTask, task: event.target.value })
          }
        />
        <input
          type="checkbox"
          checked={newTask.status}
          className="checkbox"
          onChange={(event) =>
            setNewTask({
              ...newTask,
              status: !newTask.status,
            })
          }
        />
        {update != 0 ? (
          <div>
            <input type="submit" value="Update" className="btn submit-btn" />
            <input
              type="button"
              value="Cancel"
              onClick={cancelUpdate}
              className="btn submit-btn"
            />
          </div>
        ) : (
          <input type="submit" value="Submit" className="btn submit-btn" />
        )}

        <input
          type="button"
          value="Clear"
          onClick={(event) => setNewTask({ task: "", status: false })}
          className="btn submit-btn"
        />
        <input
          type="button"
          value="Delete all tasks"
          onClick={handleDeleteAll}
          className="btn delete-all-btn"
        />
      </form>
      <br />
      <div className="tasks">
        {tasks.length == 0 ? (
          <div>No Tasks Found</div>
        ) : (
          tasks.map((task, index) => (
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
          ))
        )}
      </div>
    </section>
  );
}

export default App;
