import { createAsyncThunk } from "@reduxjs/toolkit";
import { call } from "../../services/api";
import { serverErrorMessage } from "../../utils/messages";
import { NotificationManager } from "react-notifications";
import { setAccessToken } from "../../services/api";

export const logout = createAsyncThunk("auth/logout", async () => {
  call("get", "logout");
  setAccessToken(null);
});

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await call("post", "io-login", data);
    const { name, email, access_token } = response.data;

    setAccessToken(access_token);
    return { name, email };
  } catch (error) {
    const { status, data } = error.response;

    if (status === 401) {
      setAccessToken(null);
      NotificationManager.error(data.data.message);
    } else {
      NotificationManager.error(serverErrorMessage);
    }
    throw thunkAPI.rejectWithValue(error.message);
  }
});

export const autoLogin = createAsyncThunk(
  "auth/autoLogin",
  async (_, thunkAPI) => {
    try {
      const response = await call("get", "user");
      const { name, email } = response.data;

      return { name, email };
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        setAccessToken(null);
        NotificationManager.error(data.data.message);
      } else {
        NotificationManager.error(serverErrorMessage);
      }
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, thunkAPI) => {
    try {
      const response = await call("post", "io-change-password", data);

      NotificationManager.success(response.data.message);
    } catch (error) {
      const { status, data } = error.response;
      if (status === 400) {
        const obj = data.data;
        NotificationManager.error(obj[Object.keys(obj)[0]]);
      } else if (status === 401) {
        setAccessToken(null);
        NotificationManager.error(data.data.message);
      } else {
        NotificationManager.error(serverErrorMessage);
      }
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);
