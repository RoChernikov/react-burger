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
  canResetPwd: boolean;
}

const initialState: IUserState = {
  status: 'success',
  user: {
    name: '',
    email: ''
  },
  isAuth: !!getCookie('accessToken'),
  canResetPwd: false
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
    },
    setResetPwdStatus(state, action: PayloadAction<boolean>) {
      state.canResetPwd = action.payload;
    }
  }
});

export const {
  setStatusSuccess,
  setStatusPending,
  setStatusFailed,
  setUser,
  setAuth,
  setResetPwdStatus
} = userSlice.actions;

export const updateToken: AppThunk = () => (dispatch: AppDispatch) => {
  if (!getCookie('refreshToken')) {
    throw new Error('There is no refresh token in cookies');
  }
  return Api.updateToken()
    .then(res => {
      setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
      setCookie('refreshToken', res.refreshToken);
    })
    .catch(err => {
      dispatch(setStatusFailed());
      console.log(err);
    });
};

export const signIn: AppThunk = (data: IForm) => (dispatch: AppDispatch) => {
  dispatch(setStatusPending());
  Api.signIn(data)
    .then(res => {
      setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
      setCookie('refreshToken', res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuth(true));
      dispatch(setStatusSuccess());
    })
    .catch(err => {
      dispatch(setStatusFailed());
      console.log(err);
    });
};

export const signOut: AppThunk =
  (cb: () => void) => (dispatch: AppDispatch) => {
    dispatch(setStatusPending());
    Api.signOut()
      .then(res => {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        dispatch(setUser({ name: '', email: '' }));
        dispatch(setStatusSuccess());
        dispatch(setAuth(false));
        cb();
      })
      .catch(err => {
        dispatch(setStatusFailed());
        console.log(err);
      });
  };

export const register: AppThunk = (data: IForm) => (dispatch: AppDispatch) => {
  dispatch(setStatusPending());
  Api.register(data)
    .then(res => {
      setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
      setCookie('refreshToken', res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuth(true));
      dispatch(setStatusSuccess());
    })
    .catch(err => {
      dispatch(setStatusFailed());
      console.log(err);
    });
};

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(setStatusPending());
  Api.updateToken()
    .then(res => {
      setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
      setCookie('refreshToken', res.refreshToken);
    })
    .then(() => {
      Api.getUser()
        .then(res => {
          dispatch(setUser(res.user));
          dispatch(setStatusSuccess());
        })
        .catch(err => {
          dispatch(updateToken());
          dispatch(setStatusFailed());
          console.log(err);
        });
    })
    .catch(err => {
      dispatch(updateToken());
      dispatch(setStatusFailed());
      dispatch(setAuth(false));
      console.log(err);
    });
};

export const patchUser: AppThunk = (data: TUser) => (dispatch: AppDispatch) => {
  dispatch(setStatusPending());
  Api.patchUser(data)
    .then(res => {
      dispatch(setUser(res.user));
      dispatch(setStatusSuccess());
    })
    .catch(err => {
      dispatch(setStatusFailed());
      console.log(err);
    });
};

export const forgotPassword: AppThunk =
  (email: string, cb: () => void) => (dispatch: AppDispatch) => {
    dispatch(setStatusPending());
    Api.forgotPassword(email)
      .then(res => {
        dispatch(setStatusSuccess());
        dispatch(setResetPwdStatus(true));
        cb();
      })
      .catch(err => {
        dispatch(setStatusFailed());
        console.log(err);
      });
  };

export const resetPassword: AppThunk =
  (password: string, token: string, cb: () => void) =>
  (dispatch: AppDispatch) => {
    dispatch(setStatusPending());
    Api.resetPassword({ password, token })
      .then(res => {
        dispatch(setStatusSuccess());
        cb();
      })
      .catch(err => {
        dispatch(setStatusFailed());
        console.log(err);
      });
  };
