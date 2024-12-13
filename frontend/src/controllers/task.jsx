import { BaseURL } from "../config";
import { useApiHandler } from "../utils/ApiHandles";

const getHeaders = () => {
  const getAccessToken = localStorage.getItem("accessToken");
  if (getAccessToken != null) {
    const accessToken = getAccessToken.replace(/"/g, "");

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    return headers;
  }
};

const ApiAddTask = async (body, navigate) => {
  const response = await fetch(`${BaseURL}/addTask`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  return useApiHandler(response, navigate);
};

const ApiGetTasks = async (user, navigate) => {
  const response = await fetch(`${BaseURL}/getTasks/${user}`, {
    method: "GET",
    headers: getHeaders(),
  });

  return useApiHandler(response, navigate);
};

const ApiHandleToggle = async (id, navigate) => {
  const response = await fetch(`${BaseURL}/toggleCheckBox/${id}`, {
    method: "PUT",
    headers: getHeaders(),
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
    headers: getHeaders(),
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
    headers: getHeaders(),
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
    headers: getHeaders(),
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
  getHeaders,
};

export default ApiFunctions;
