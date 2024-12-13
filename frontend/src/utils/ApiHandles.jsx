export const useApiHandler = async (response, navigate) => {
  if (response.ok) {
    const data = await response.json();
    console.log(`response : ${JSON.stringify(data)}`);
    return data.data;
  } else if (response.status === 401) {
    navigate("/");
  } else {
    const data = await response.json();
    alert(data.message);
  }
};
