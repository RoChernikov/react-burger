import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../../services/store';
import Api from '../../utils/api';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import { TUser } from './../../utils/types';
//--------------------------------------------------------------------------------

interface IUserState {
  userRequest: boolean;
  userSuccess: boolean;
  userFailed: boolean;
  accessToken: string;
  isAuthorized: boolean;
  user: TUser;
  canResetPassword: boolean;
}

const initialState: IUserState = {
  userRequest: false,
  userSuccess: false,
  userFailed: false,
  accessToken: '',
  isAuthorized: false,
  user: {
    name: '',
    email: ''
  },
  canResetPassword: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    request(state) {
      state.userFailed = false;
      state.userSuccess = false;
      state.userRequest = true;
    },
    success(state) {
      state.userFailed = false;
      state.userRequest = false;
      state.userSuccess = true;
    },
    failed(state) {
      state.userFailed = true;
      state.userSuccess = false;
      state.userRequest = false;
    },
    setUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
    },
    setAuthorization(state, action: PayloadAction<boolean>) {
      state.isAuthorized = action.payload;
    },
    resetUserData(state) {
      state.user.name = '';
      state.user.email = '';
    }
  }
});

export const {
  request,
  success,
  failed,
  setUser,
  setAuthorization,
  resetUserData
} = userSlice.actions;

export const updateToken: AppThunk = () => () => {
  const token = getCookie('refreshToken');
  if (!token) {
    throw new Error('There is no refresh token in cookies');
  }
  return Api.updateToken(token).then(data =>
    setCookie('refresh-token', data.refreshToken)
  );
};

export const register: AppThunk = data => (dispatch: AppDispatch) => {
  dispatch(request());
  Api.register(data)
    .then(data => {
      if (data.success) {
        dispatch(setUser(data.user));
        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken);
        dispatch(setAuthorization(true));
        dispatch(success());
      } else {
        throw Error(data.message);
      }
    })
    .catch(err => {
      dispatch(failed());
      console.log(`${err}`);
    });
};

export const login: AppThunk = data => (dispatch: AppDispatch) => {
  dispatch(request());
  Api.login(data)
    .then(data => {
      if (data.success) {
        dispatch(setUser(data.user));
        setCookie('accessToken', data.accessToken);
        setCookie('refresh-token', data.refreshToken);
        dispatch(setAuthorization(true));
        dispatch(success());
      } else {
        throw Error(data.message);
      }
    })
    .catch(err => {
      dispatch(failed());
      console.log(`${err}`);
    });
};

export const logOut: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(request());
  const token = getCookie('refreshToken');
  if (!token) {
    throw new Error('There is no refresh token in cookies');
  }
  return Api.logout(token)
    .then(data => {
      if (data.success) {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        dispatch(resetUserData());
        dispatch(setAuthorization(false));
        dispatch(success());
      } else {
        throw Error(data.message);
      }
    })
    .catch(err => {
      dispatch(failed());
      console.log(`${err}`);
    });
};
