import {
  createAppSlice,
  handleServerAppError,
  handleServerNetworkError,
} from "@/common/utils";
import { Inputs } from "@/features/auth/lib/schemas";
import { setAppStatusAC } from "@/app/app-slice.ts";
import { authApi } from "@/features/auth/api/authApi.ts";
import { ResultCode } from "@/common/enums";
import { AUTH_TOKEN } from "@/common/constants";

interface AuthState {
  isLoggedIn: boolean;
}

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  } as AuthState,
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (data: Inputs, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }));
          const res = await authApi.login(data);
          const result = res.data;
          if (result.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }));
            localStorage.setItem(AUTH_TOKEN, result.data.token);
            return { isLoggedIn: true };
          } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (error) {
          handleServerNetworkError(dispatch, error);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        },
        rejected: (state) => {
          state.isLoggedIn = false;
        },
      }
    ),
    logoutTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }));
          const res = await authApi.logout();
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }));
            localStorage.removeItem(AUTH_TOKEN);
            return { isLoggedIn: false };
          } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (error: any) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        },
      }
    ),
    initializeAppTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }));
          const res = await authApi.me();
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }));
            return { isLoggedIn: true };
          } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (error: any) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        },
      }
    ),
  }),
});

export const { selectIsLoggedIn } = authSlice.selectors;
export const { loginTC, logoutTC, initializeAppTC } = authSlice.actions;
export const authReducer = authSlice.reducer;
