class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkResponse);
  }

  changeUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._checkResponse);
  }

  getMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkResponse);
  }

  addMovies(data) {
    return fetch(`${this._url}/movies/`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        country: data.country ?? "country",
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailerLink:
          data.trailerLink ??
          `https://www.youtube.com/results?search_query=трейлер+${data.nameRU}`,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        movieId: data.id,
      }),
    }).then(this._checkResponse);
  }

  removeMovies(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  url: "https://api.stepanmovies.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
