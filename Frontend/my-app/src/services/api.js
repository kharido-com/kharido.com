const BASE_URL = "http://localhost:8082";

export async function api(url, options = {}) {
  const response = await fetch(BASE_URL + url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}