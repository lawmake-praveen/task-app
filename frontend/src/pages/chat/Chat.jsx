import React from "react";
import InputArea from "../../components/InputArea";
import { useAppContext } from "../../AppContext";
import Task from "../../components/Task";

const Chat = () => {
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

  return (
    <div className="chat">
      <div className="top">
        <h1>Task App</h1>
        {/* <p onClick={() => navigate("/chat")}>Chat</p> */}
        <p onClick={logout}>Log out</p>
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
            <Task
              index={index}
              task={task}
              update={update}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleToggle={handleToggle}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Chat;
