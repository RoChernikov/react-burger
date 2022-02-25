import Api from '../../utils/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../../services/store';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import { TUser } from '../../utils/types';
import { ILoginForm } from '../../utils/interfaces';
//--------------------------------------------------------------------------------

interface IUserState {
  user: TUser;
}

const initialState: IUserState = {
  user: {
    name: '',
    email: ''
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;
