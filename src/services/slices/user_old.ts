import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../../services/store';
import Api from '../../utils/api';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import { TUser } from '../../utils/types';
import { IForm } from '../../utils/interfaces';
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
    },
    allowPasswordReset: state => {
      state.canResetPassword = true;
    },
    restrictPasswordReset: state => {
      state.canResetPassword = false;
    }
  }
});

export const {
  request,
  success,
  failed,
  setUser,
  setAuthorization,
  resetUserData,
  allowPasswordReset,
  restrictPasswordReset
} = userSlice.actions;

export const updateToken: AppThunk = () => () => {
  let token = getCookie('refreshToken');
  if (!token) {
    throw new Error('There is no refresh token in cookies');
  }
  return Api.updateToken(token).then(data => {
    setCookie('accessToken', data.accessToken);
    setCookie('refreshToken', data.refreshToken);
  });
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

export const signIn: AppThunk =
  (data: IForm, cb) => (dispatch: AppDispatch) => {
    dispatch(request());
    Api.signIn(data)
      .then(data => {
        if (data.success) {
          dispatch(setUser(data.user));
          setCookie('accessToken', data.accessToken);
          setCookie('refreshToken', data.refreshToken);
          dispatch(setAuthorization(true));
          dispatch(success());
          cb();
        } else {
          throw Error(data.message);
        }
      })
      .catch(err => {
        dispatch(failed());
        console.log(`${err}`);
      });
  };

export const signOut: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(request());
  let token = getCookie('refreshToken');
  if (!token) {
    throw new Error('There is no refresh token in cookies');
  }
  return Api.signOut(token)
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

export const forgotPassword: AppThunk =
  (email: string) => (dispatch: AppDispatch) => {
    dispatch(request());
    return Api.forgotPassword(email)
      .then(data => {
        if (data.success) {
          dispatch(setUser(data.user));
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

export const resetPassword: AppThunk =
  (password: string, token: string) => (dispatch: AppDispatch) => {
    dispatch(request());
    return Api.resetPassword({ password, token })
      .then(data => {
        if (data.success) {
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

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(request());
  let accessToken: string = getCookie('accessToken');
  return Api.getUser(accessToken)
    .then(data => {
      if (data.success) {
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

export const patchUser: AppThunk = (data: TUser) => (dispatch: AppDispatch) => {
  let accessToken: string = getCookie('accessToken') || '';
  dispatch(request());
  return Api.patchUser(accessToken, data)
    .then(data => {
      if (data.success) {
        dispatch(setUser(data.user));
        dispatch(success());
      } else if (data.message === 'jwt expired') {
        updateToken();
      } else {
        throw Error(data.message);
      }
    })
    .catch(err => {
      dispatch(failed());
      console.log(`${err}`);
    });
};
