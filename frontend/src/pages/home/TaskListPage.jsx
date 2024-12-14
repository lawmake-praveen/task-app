import React from "react";
import { useEffect } from "react";
import Task from "../../components/Task";
import InputArea from "../../components/InputArea";
import { useAppContext } from "../../AppContext";

const Home = () => {
  const {
    update,
    newTask,
    setNewTask,
    cancelUpdate,
    handleDelete,
    handleDeleteAll,
    handleUpdate,
    handleSubmit,
    handleEdit,
    handleToggle,
    listLoading,
    tasks,
    getTasks,
    logout,
  } = useAppContext();

  useEffect(() => {
    getTasks();
  }, []);

  
  return (
    <section className="app">
      <div className="top">
        <h1>Task App</h1>
        {/* <p onClick={() => navigate("/chat")}>Chat</p> */}
        <p onClick={logout}>Logout</p>
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
