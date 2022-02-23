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
    setName(state, action: PayloadAction<string>) {
      state.user = {
        ...state.user,
        name: action.payload
      };
    },
    setEmail(state, action: PayloadAction<string>) {
      state.user = {
        ...state.user,
        email: action.payload
      };
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

const { request, success, failed, setName, setEmail, setAuthorization } =
  userSlice.actions;

export const register: AppThunk = data => (dispatch: AppDispatch) => {
  dispatch(request());
  Api.register(data)
    .then(data => {
      if (data.success) {
        dispatch(setEmail(data.user.email));
        dispatch(setName(data.user.name));
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
