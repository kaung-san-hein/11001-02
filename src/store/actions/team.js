import { createAsyncThunk } from "@reduxjs/toolkit";
import { call } from "../../services/api";
import { serverErrorMessage } from "../../utils/messages";
import { NotificationManager } from "react-notifications";
import { setAccessToken } from "../../services/api";

export const getTeams = createAsyncThunk(
  "team/getTeams",
  async (query, thunkAPI) => {
    try {
      const result = await call(
        "get",
        `teams?${new URLSearchParams(query).toString()}`
      );

      return result;
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

export const getTeam = createAsyncThunk(
  "team/getTeam",
  async (id, thunkAPI) => {
    try {
      const response = await call("get", `teams/${id}`);
      const result = response.data;

      return result;
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

export const createTeam = createAsyncThunk(
  "team/createTeam",
  async (data, thunkAPI) => {
    try {
      const response = await call("post", "teams", data);
      const result = response.data;

      NotificationManager.success("Team has been created successfully!");
      return result;
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

export const updateTeam = createAsyncThunk(
  "team/updateTeam",
  async (data, thunkAPI) => {
    try {
      const response = await call("post", `teams/${data.id}?_method=PUT`, data);
      const result = response.data;

      NotificationManager.success("Team has been updated successfully!");
      return result;
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

export const deleteTeam = createAsyncThunk(
  "team/deleteTeam",
  async (id, thunkAPI) => {
    try {
      await call("delete", `teams/${id}`);

      NotificationManager.success("Team has been deleted successfully!");
      return id;
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
