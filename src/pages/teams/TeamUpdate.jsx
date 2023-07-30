import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CustomTextField from "../../components/input/CustomTextField";
import Grid from "@mui/material/Grid";
import CustomModal from "../../components/modal/CustomModal";
import { useForm } from "react-hook-form";
import CustomNumberField from "../../components/input/CustomNumberField";
import { useDispatch, useSelector } from "react-redux";
import { updateTeam } from "../../store/actions/team";

const TeamUpdate = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { team } = useSelector((state) => state.team);

  useEffect(() => {
    const { name, player_count, region, country } = team;

    setValue("name", name);
    setValue("player_count", player_count);
    setValue("region", region);
    setValue("country", country);
  }, [setValue, team]);

  const onSubmit = async (data) => {
    setLoading(true);
    await dispatch(updateTeam({ ...data, id: team.id }));
    setLoading(false);
  };

  const handleReset = useCallback(() => {
    reset({
      name: "",
      player_count: "",
      region: "",
      country: "",
    });
  }, [reset]);

  return (
    <CustomModal
      title="New Team"
      isOpen={open}
      onClick={(prev) => setOpen(!prev)}
    >
      <Grid alignItems="center" container spacing={2}>
        <Grid item xs={12} md={6}>
          <CustomTextField
            id="name"
            label="Name"
            register={{
              ...register("name", {
                required: "Name is required!",
              }),
            }}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomNumberField
            id="player_count"
            label="Player Count"
            register={{
              ...register("player_count", {
                required: "Player Count is required!",
              }),
            }}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            id="region"
            label="Region"
            register={{
              ...register("region", {
                required: "Region is required!",
              }),
            }}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            id="country"
            label="Country"
            register={{
              ...register("country", {
                required: "Country is required!",
              }),
            }}
            errors={errors}
          />
        </Grid>
      </Grid>
      <Grid
        mt={3}
        justifyContent="end"
        alignItems="center"
        container
        spacing={2}
      >
        <Grid item>
          <Button variant="contained" color="secondary" onClick={handleReset}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Update"}
          </Button>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default TeamUpdate;
