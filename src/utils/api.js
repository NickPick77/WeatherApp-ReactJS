const BASE_URL =
  "https://api.weatherapi.com/v1/forecast.json?key=afa4bc66c51b4fa49e1163910221805&lang=en&days=5&aqi=yes&q=";

const SEARCH_URL =
  "https://api.weatherapi.com/v1/search.json?key=afa4bc66c51b4fa49e1163910221805&q=";

//FETCH PROMISE WITH .THEN
/*
export const http = (resource = "", options) =>
  fetch(`${BASE_URL}/${resource}`, options).then((result) => {
    return result.json();
  });
// GET
export const GET = (resource) => http(resource, { method: "GET" });
*/

//ASYNC FETCH
export const http = async (URL, resource = "", options) => {
  const result = await fetch(`${URL}${resource}`, options);
  if (result.status >= 200 && result.status <= 299) {
    return await result.json();
  } else {
    console.log(result.status);

    throw new Error("qualcosa è andato storto");
  }
};
// GET
export const GET_FORECAST = (resource) =>
  http(BASE_URL, resource, { method: "GET" });

//SEARCH
export const SEARCH = (resource) =>
  http(SEARCH_URL, resource, { method: "GET" });

//POST
export const POST = (resource, body) =>
  http(resource, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

//DELETE
export const DELETE = (id) => http(`${id}`, { method: "DELETE" });

//PUT
export const PUT = (id, body) =>
  http(id, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
