const BASE_URL = 'https://norma.nomoreparties.space/api';

type TBaseUrl = { baseUrl: string };

class Api {
  _baseUrl: string;
  _headers: { [key: string]: string };
  constructor({ baseUrl }: TBaseUrl) {
    this._baseUrl = baseUrl;
    this._headers = {
      'Content-Type': 'application/json'
    };
  }

  _getResponceData(res: Response) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getIngredients() {
    return fetch(`${BASE_URL}/ingredients`, {
      method: 'GET',
      headers: this._headers
    }).then(this._getResponceData);
  }

  sendOrder(ingredients: string[]) {
    return fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      body: JSON.stringify({ ingredients }),
      headers: this._headers
    }).then(this._getResponceData);
  }
}

export default new Api({
  baseUrl: BASE_URL
});
