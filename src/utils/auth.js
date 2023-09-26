function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export const BASE_URL = "https://api.stepanmovies.nomoreparties.co";

export function registerNewUser(data) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function loginUser(data) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function checkValidityToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}
