import Api from '../../utils/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../../services/store';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import { TUser, TStatus } from '../../utils/types';
import { IForm } from '../../utils/interfaces';
//--------------------------------------------------------------------------------

interface IUserState {
  status: TStatus;
  user: TUser;
  isAuth: boolean;
}

const initialState: IUserState = {
  status: 'success',
  user: {
    name: '',
    email: ''
  },
  isAuth: !!getCookie('accessToken')
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStatusSuccess(state) {
      state.status = 'success';
    },
    setStatusPending(state) {
      state.status = 'pending';
    },
    setStatusFailed(state) {
      state.status = 'failed';
    },
    setUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
    },
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    }
  }
});

export const {
  setStatusSuccess,
  setStatusPending,
  setStatusFailed,
  setUser,
  setAuth
} = userSlice.actions;

export const updateToken: AppThunk = () => () => {
  let token = getCookie('refreshToken');
  console.log(token);
  if (!token) {
    throw new Error('There is no refresh token in cookies');
  }
  return Api.updateToken(token).then(res => {
    setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
    setCookie('refreshToken', res.refreshToken);
  });
};

export const signIn: AppThunk =
  (data: IForm, cb: () => void) => (dispatch: AppDispatch) => {
    dispatch(setStatusPending());
    Api.signIn(data)
      .then(res => {
        if (res.success) {
          setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
          setCookie('refreshToken', res.refreshToken);
          dispatch(setUser(res.user));
          dispatch(setAuth(true));
          dispatch(setStatusSuccess());
          cb();
        } else {
          throw Error(res.message);
        }
      })
      .catch(err => {
        dispatch(setStatusFailed());
        console.log(`${err}`);
      });
  };

export const signOut: AppThunk =
  (cb: () => void) => (dispatch: AppDispatch) => {
    dispatch(setStatusPending());
    Api.signOut(getCookie('refreshToken'))
      .then(res => {
        if (res.success) {
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
          dispatch(setUser({ name: '', email: '' }));
          dispatch(setStatusSuccess());
          dispatch(setAuth(false));
          cb();
        } else {
          throw Error(res.message);
        }
      })
      .catch(err => {
        dispatch(setStatusFailed());
        console.log(`${err}`);
      });
  };

export const register: AppThunk =
  (data: IForm, cb: () => void) => (dispatch: AppDispatch) => {
    dispatch(setStatusPending());
    Api.register(data)
      .then(res => {
        if (res.success) {
          setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
          setCookie('refreshToken', res.refreshToken);
          dispatch(setUser(res.user));
          dispatch(setAuth(true));
          dispatch(setStatusSuccess());
          cb();
        } else {
          throw Error(res.message);
        }
      })
      .catch(err => {
        dispatch(setStatusFailed());
        console.log(`${err}`);
      });
  };

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(setStatusPending());
  Api.getUser(getCookie('accessToken'))
    .then(res => {
      if (res.success) {
        dispatch(setUser(res.user));
        dispatch(setStatusSuccess());
      } else {
        throw Error(res.message);
      }
    })
    .catch(err => {
      dispatch(setStatusFailed());
      console.log(`${err}`);
    });
};

export const patchUser: AppThunk = (data: TUser) => (dispatch: AppDispatch) => {
  dispatch(setStatusPending());
  Api.patchUser(getCookie('accessToken'), data)
    .then(res => {
      if (res.success) {
        dispatch(setUser(res.user));
        dispatch(setStatusSuccess());
      } else {
        throw Error(res.message);
      }
    })
    .catch(err => {
      dispatch(setStatusFailed());
      console.log(`${err}`);
    });
};

export const forgotPassword: AppThunk =
  (email: string, cb: () => void) => (dispatch: AppDispatch) => {
    dispatch(setStatusPending());
    Api.forgotPassword(email)
      .then(res => {
        if (res.success) {
          dispatch(setStatusSuccess());
          cb();
        } else {
          throw Error(res.message);
        }
      })
      .catch(err => {
        dispatch(setStatusFailed());
        console.log(`${err}`);
      });
  };

export const resetPassword: AppThunk =
  (password: string, token: string, cb: () => void) =>
  (dispatch: AppDispatch) => {
    dispatch(setStatusPending());
    Api.resetPassword({ password, token })
      .then(res => {
        if (res.success) {
          dispatch(setStatusSuccess());
          cb();
        } else {
          throw Error(res.message);
        }
      })
      .catch(err => {
        dispatch(setStatusFailed());
        console.log(`${err}`);
      });
  };
