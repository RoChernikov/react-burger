import {IForm} from './interfaces';
import request from './api-client';
import {getCookie} from './cookie';

class Api {
  getIngredients() {
    return request.get('/ingredients').then(res => res.data);
  }

  sendOrder(ingredients: string[]) {
    return request.post('/orders', {ingredients}).then(res => res.data);
  }

  register(data: IForm) {
    return request.post('/auth/register', data).then(res => res.data);
  }

  signIn(data: IForm) {
    return request.post('/auth/login', data).then(res => res.data);
  }

  updateToken() {
    return request
      .post('/auth/token', {token: getCookie('refreshToken')})
      .then(res => res.data);
  }

  getUser() {
    return request.get('/auth/user').then(res => res.data);
  }

  patchUser(data: {name: string; email: string}) {
    return request.patch('/auth/user', data).then(res => res.data);
  }

  signOut() {
    return request
      .post('/auth/logout', {token: getCookie('refreshToken')})
      .then(res => res.data);
  }

  forgotPassword(email: string) {
    return request.post('/auth/user', email).then(res => res.data);
  }

  resetPassword(data: {password: string; token: string}) {
    return request.post('/auth/user', data).then(res => res.data);
  }
}

export default new Api();
