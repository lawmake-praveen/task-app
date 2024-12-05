import { BaseURL } from "../config";

const headers = {
  "Content-Type": "application/json",
};

const ApiAddTask = async (body) => {
  const response = await fetch(`${BaseURL}/addTask`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
  return response;
};

const ApiGetTasks = async () => {
  const response = await fetch(`${BaseURL}/getTasks`, {
    method: "GET",
    headers: headers,
  });
  if (response.ok) {
    const data = await response.json();
    return data.data;
  } else {
    const data = await response.json();
    alert(data.message);
  }
};

const ApiHandleToggle = async (id) => {
  const response = await fetch(`${BaseURL}/toggleCheckBox/${id}`, {
    method: "PUT",
    headers: headers,
  });
  if (response.ok) {
    return response;
  } else {
    const data = await response.json();
    alert(data.message);
  }
};

const ApiHandleDelete = async (id) => {
  const response = await fetch(`${BaseURL}/deleteTask/${id}`, {
    method: "DELETE",
    headers: headers,
  });
  if (response.ok) {
    return response;
  } else {
    const data = await response.json();
    alert(data.message);
  }
};

const ApiHandleDeleteAll = async () => {
  const response = await fetch(`${BaseURL}/deleteAllTasks`, {
    method: "DELETE",
    headers: headers,
  });
  if (response.ok) {
    return response;
  } else {
    const data = await response.json();
    alert(data.message);
  }
};

const ApiHandleUpdate = async (body) => {
  const response = await fetch(`${BaseURL}/updateTask`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  if (response.ok) {
    return response;
  } else {
    const data = await response.json();
    alert(data.message);
  }
};

const ApiFunctions = {
  ApiAddTask,
  ApiGetTasks,
  ApiHandleToggle,
  ApiHandleDelete,
  ApiHandleDeleteAll,
  ApiHandleUpdate,
};

export default ApiFunctions;
