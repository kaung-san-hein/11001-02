import { createSlice } from "@reduxjs/toolkit";
import {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
} from "../actions/team";

const initialState = {
  loading: false,
  success: false,
  teams: [],
  team: {},
  total: 0,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  extraReducers: (builder) => {
    // Get teams
    builder.addCase(getTeams.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTeams.fulfilled, (state, action) => {
      state.loading = false;
      state.teams = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(getTeams.rejected, (state) => {
      state.loading = false;
    });

    // Create teams
    builder.addCase(createTeam.pending, (state) => {
      state.success = false;
    });
    builder.addCase(createTeam.fulfilled, (state, action) => {
      state.success = true;
      state.teams = [action.payload, ...state.teams];
      state.total = state.total + 1;
    });
    builder.addCase(createTeam.rejected, (state) => {
      state.success = false;
    });

    // Get team
    builder.addCase(getTeam.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getTeam.fulfilled, (state, action) => {
      state.loading = false;
      state.team = action.payload;
    });
    builder.addCase(getTeam.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    // Update team
    builder.addCase(updateTeam.pending, (state) => {
      state.success = false;
    });
    builder.addCase(updateTeam.fulfilled, (state, action) => {
      let index = state.teams.findIndex(
        (team) => team.id === action.payload.id
      );
      state.teams[index] = action.payload;
      state.success = true;
      state.team = action.payload;
    });
    builder.addCase(updateTeam.rejected, (state) => {
      state.success = false;
    });

    // Delete team
    builder.addCase(deleteTeam.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTeam.fulfilled, (state, action) => {
      state.loading = false;
      state.teams = state.teams.filter((team) => team.id !== action.payload);
      state.total = state.total - 1;
    });
    builder.addCase(deleteTeam.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default teamSlice.reducer;
