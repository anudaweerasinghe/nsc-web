import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { ArrowForwardIos, Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
// eslint-disable-next-line
import { spacing } from "@material-ui/system";

function title(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    borderRadius: 20,
  },
  name: {
    fontSize: 12,
  },
  profileType: {
    fontSize: 12,
  },
  age: {
    fontSize: 14,
  },
  school: {
    fontSize: 12,
    color: "gray",
  },
  city: {
    fontSize: 14,
  },
  sport: {
    fontSize: 14,
  },
  large: {
    width: 70,
    height: 70,
  },
}));

function AvatarAndName({ profile }) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      alignItems="center"
      justify="flex-start"
    >
      <Grid item>
        <Avatar src={profile.profilePicUrl} className={classes.large} />
      </Grid>
      <Grid item>
        <Typography variant="h6" align="left">
          {profile.preferredName} {profile.lastName}
        </Typography>
        <Typography className={classes.school} align="left">
          {profile.school}
        </Typography>
      </Grid>
    </Grid>
  );
}

function AgeSport({ profile, editLinks = false }) {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="flex-end"
        justify="space-between"
      >
        <Grid item>
          <Box pt={0}>
            <Typography className={classes.age} align="right">
              {profile.age}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box pb={1}>
            <Typography className={classes.sport} align="right">
              {profile.sport.name} {title(profile.profileType)}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" justify="flex-end" spacing={1}>
            {editLinks && (
              <Grid item>
                <Link to={profile._id + "/edit"}>
                  <IconButton size="small" component={Edit} />
                </Link>
              </Grid>
            )}
            <Grid item>
              <IconButton size="small" component={ArrowForwardIos} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export function ProfileCard({ profile, editLinks = false }) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent justify="center">
          <Grid container direction="row" justify="space-between" spacing={2}>
            <Grid item xs={9}>
              <AvatarAndName profile={profile} />
            </Grid>
            <Grid item xs={3}>
              <AgeSport profile={profile} editLinks={editLinks} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
