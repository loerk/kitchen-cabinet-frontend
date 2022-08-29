const BASE_URL = process.env.REACT_APP_BASE_URL;

export const loginFetchData = async (path, data) => {
  const url = `${BASE_URL}${path}`;
  const postHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": BASE_URL,
  };

  const postOptions = {
    method: "POST",
    credentials: "include",
    headers: postHeaders,
    body: JSON.stringify(data),
  };

  const response = await fetch(url, postOptions);
  try {
    if (response.ok) {
      const data = response.json();
      return data;
    }
    throw new Error("sorry, something went wrong");
  } catch (error) {
    return error.message;
  }
};

export const fetchData = async (path, method, data) => {
  const url = `${BASE_URL}${path}`;
  const postHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const getHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const postOptions = {
    credentials: "include",
    method: method,
    headers: postHeaders,
    body: JSON.stringify(data),
  };

  const getOptions = {
    credentials: "include",
    method: method,
    headers: getHeaders,
  };
  const response = await fetch(
    url,
    method === "GET" || method === "DELETE" ? getOptions : postOptions
  );
  try {
    if (response.ok) {
      const data = response.json();
      return data;
    }
    throw new Error("sorry, something went wrong");
  } catch (error) {
    throw error;
  }
};
