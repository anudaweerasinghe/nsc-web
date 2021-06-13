import React from "react";
import { Paper, Box, Grid } from "@material-ui/core";

// eslint-disable-next-line
import { spacing } from "@material-ui/system";

import { ProfileForm } from "../components/profileForm";
export default function NewProfile() {
  const newProfile = {
    firstName: "",
    lastName: "",
    preferredName: "",
    association: undefined,
    // TODO
    profilePicUrl: "",
    sport: undefined,
    // TODO
    age: 0,
    // TODO
    dateOfBirth: undefined,
    country: "",
    city: "",
    school: "",
    // TODO
    profileType: "",
  };

  function onSubmit(profile) {}

  return (
    <>
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <Paper style={{ borderRadius: 20 }}>
            <Box px={5} py={3}>
              <ProfileForm profile={newProfile} onSubmit={onSubmit} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
