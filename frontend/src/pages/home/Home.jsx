import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BaseURL } from "../../config";
import ApiFunctions from "../../controllers/task";
import Task from "../../components/Task";
import InputArea from "../../components/InputArea";

const Home = () => {
  const [newTask, setNewTask] = useState({
    task: "",
    status: false,
  });
  const [update, setUpdate] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    getTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date();
    const body = {
      task: newTask.task,
      status: newTask.status,
      createdAt: `${date.toISOString().slice(0, 19).replace("T", " ")}`,
    };

    const response = await ApiFunctions.ApiAddTask(body);
    if (response.ok) {
      await getTasks();
      setNewTask({
        task: "",
        status: false,
      });
    }
  };

  const getTasks = async () => {
    const response = await ApiFunctions.ApiGetTasks();
    if (Array.isArray(response)) {
      setTasks(response);
      setListLoading(false);
    }
  };

  const handleToggle = async (id) => {
    const response = await ApiFunctions.ApiHandleToggle(id);
    if (response.ok) {
      await getTasks();
    }
  };

  const handleDelete = async (id) => {
    const response = await ApiFunctions.ApiHandleDelete(id);
    if (response.ok) {
      await getTasks();
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const response = await ApiFunctions.ApiHandleDeleteAll();
      if (response.ok) {
        await getTasks();
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
    const body = {
      id: update,
      task: newTask.task,
      status: newTask.status,
    };
    const response = await ApiFunctions.ApiHandleUpdate(body);
    if (response.ok) {
      await getTasks();
      setUpdate(0);
      setNewTask({
        task: "",
        status: false,
      });
    }
  };

  const cancelUpdate = () => {
    setNewTask({ task: "", status: false });
    setUpdate(0);
    getTasks();
  };

  return (
    <section className="app">
      <div className="top">
        <h1>Task App</h1>
        <p>Logout</p>
      </div>
      <InputArea
        update={update}
        newTask={newTask}
        setNewTask={setNewTask}
        cancelUpdate={cancelUpdate}
        handleDeleteAll={handleDeleteAll}
        handleUpdate={handleUpdate}
        handleSubmit={handleSubmit}
      />
      <br />
      <div className="tasks">
        {listLoading ? (
          <div>Loading...</div>
        ) : tasks.length == 0 ? (
          <div>No Tasks Found</div>
        ) : (
          tasks.map((task, index) => (
            <div key={task.id} className="task">
              <Task
                index={index}
                task={task}
                update={update}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleToggle={handleToggle}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Home;
