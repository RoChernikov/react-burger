import { IForm } from './interfaces';
import { getCookie } from './cookie';
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
      headers: this._headers,
      body: JSON.stringify({ ingredients })
    }).then(this._getResponceData);
  }

  register(data: IForm) {
    return fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._getResponceData);
  }

  signIn(data: IForm) {
    return fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._getResponceData);
  }

  updateToken() {
    return fetch(`${BASE_URL}/auth/token`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ token: getCookie('refreshToken') })
    }).then(this._getResponceData);
  }

  getUser() {
    return fetch(`${BASE_URL}/auth/user`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getCookie('accessToken')}`
      }
    }).then(this._getResponceData);
  }

  patchUser(data: { name: string; email: string }) {
    return fetch(`${BASE_URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getCookie('accessToken')}`
      },
      body: JSON.stringify(data)
    }).then(this._getResponceData);
  }

  signOut() {
    return fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ token: getCookie('refreshToken') })
    }).then(this._getResponceData);
  }

  forgotPassword(email: string) {
    return fetch(`${BASE_URL}/password-reset`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email })
    }).then(this._getResponceData);
  }

  resetPassword(data: { password: string; token: string }) {
    return fetch(`${BASE_URL}/password-reset/reset`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._getResponceData);
  }
}

export default new Api({
  baseUrl: BASE_URL
});
