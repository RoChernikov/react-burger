const BASE_URL = 'https://norma.nomoreparties.space/api/';

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._headers = {
      'Content-Type': 'application/json'
    };
  }

  _getResponceData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getIngredients() {
    return fetch(this._baseUrl + 'ingredients', {
      method: 'GET',
      headers: this._headers
    }).then(this._getResponceData);
  }
}

export default new Api({
  baseUrl: BASE_URL
});
