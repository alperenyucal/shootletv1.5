import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


export interface AuthState {
  user?: {
    firstname: string,
    lastname: string,
    email: string,
    avatar: string,
    country: string,
    city: string,
  },
  accessToken?: string,
  refreshToken?: string,
  isAuthorized: boolean,
}

const initialState: AuthState = {
  isAuthorized: false,
};

// export const login = createAsyncThunk<
//   AuthState, { email: string, password: string }>(
//     'auth/login',
//     async (payload) => {
//       const { data } = await axios.post('/api/auth/login', payload);
//       return {
//         ...data,
//         isAuthorized: true,
//       };
//     },
//   );

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {

    login: (_, action: PayloadAction<AuthState>) => ({
      ...action.payload,
      isAuthorized: true,
    }),
    refresh: (state, action) => ({
      ...state,
      ...action.payload,
      isAuthorized: true,
    }),
    logout: () => initialState,


  },
  // extraReducers: ((builder) => {
  //   builder.addCase(login.fulfilled, (
  //     _,
  //     action: PayloadAction<AuthState>,
  //   ) => {
  //     return action.payload;
  //   });
  // }),
});

export const { login, refresh, logout } = authSlice.actions;

export const selectAuth = (state: RootState): AuthState => state.auth;

export default authSlice.reducer;
