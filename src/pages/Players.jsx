import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import BackButton from "../components/backButton/BackButton";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "60px",
}));

const PlayerList = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [players, setPlayers] = useState([]);
  const [total, setTotal] = useState(0);

  const handleFetchPlayers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://www.balldontlie.io/api/v1/players?page=${page}&per_page=10`
      );
      setTotal(data.meta.total_count);
      setPlayers((prev) => [...prev, ...data.data]);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    handleFetchPlayers();
  }, [handleFetchPlayers]);

  return (
    <Box>
      <BackButton />
      <Box sx={{ flexDirection: "column", height: "100vh" }}>
        <Grid container spacing={0}>
          <Grid item={true} xs={1}>
            <Item>ID</Item>
          </Grid>
          <Grid item={true} xs={2}>
            <Item>Full Name</Item>
          </Grid>
          <Grid item={true} xs={1}>
            <Item>Position</Item>
          </Grid>
          <Grid item={true} xs={2}>
            <Item>Team Name</Item>
          </Grid>
          <Grid item={true} xs={2}>
            <Item>City</Item>
          </Grid>
          <Grid item={true} xs={1}>
            <Item>Conference</Item>
          </Grid>
          <Grid item={true} xs={1}>
            <Item>Division</Item>
          </Grid>
          <Grid item={true} xs={1}>
            <Item>Abbreviation</Item>
          </Grid>
        </Grid>
        <InfiniteScroll
          dataLength={players.length}
          next={() => {
            setPage((prev) => prev + 1);
          }}
          hasMore={loading || players.length !== total}
          loader={
            <Box
              sx={{ display: "flex", width: "100%", justifyContent: "center" }}
            >
              <CircularProgress />
            </Box>
          }
        >
          {players.map((row, index) => (
            <Grid key={index} container spacing={0}>
              <Grid item={true} xs={1}>
                <Item>{row.id}</Item>
              </Grid>
              <Grid item={true} xs={2}>
                <Item>{`${row.first_name} ${row.last_name}`}</Item>
              </Grid>
              <Grid item={true} xs={1}>
                <Item>{row.position}</Item>
              </Grid>
              <Grid item={true} xs={2}>
                <Item>{row.team.full_name}</Item>
              </Grid>
              <Grid item={true} xs={2}>
                <Item>{row.team.city}</Item>
              </Grid>
              <Grid item={true} xs={1}>
                <Item>{row.team.conference}</Item>
              </Grid>
              <Grid item={true} xs={1}>
                <Item>{row.team.division}</Item>
              </Grid>
              <Grid item={true} xs={1}>
                <Item>{row.team.abbreviation}</Item>
              </Grid>
            </Grid>
          ))}
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default PlayerList;
