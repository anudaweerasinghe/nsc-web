import React, { useState, useEffect } from "react";
import { editRanking, getRankingById } from "../../../services/rankingService";
import { rankingsList, rankingTypes } from "../components/rankingTypes";
import { theme } from "../rankingTheme";
import {
  AppBar,
  Typography,
  Toolbar,
  CssBaseline,
  Container,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  Button,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link, useHistory, useParams } from "react-router-dom";
import ProfileSearchAutoComplete from "../components/profileSearchField";

export default function EditRanking() {
  const [rankingType, setRankingType] = useState(rankingTypes.NATIONAL);
  const [profile, setProfile] = useState(undefined);
  const [ranking, setRanking] = useState(undefined);
  const [saving, setSaving] = useState(false);
  const [rankingData, setRankingData] = useState(undefined);
  const history = useHistory();
  const { rankingID } = useParams();

  useEffect(() => {
    const getRanking = async () => {
      const rankingRes = await getRankingById(rankingID);
      if (rankingRes.status === 200) {
        if (rankingRes.data.length === 0) {
          alert("Invalid activity ID. Please try again.");
        } else {
          setRankingData(rankingRes.data[0]);
          setProfile(rankingRes.data[0].profile);
          setRankingType(rankingRes.data[0].rankingType);
          setRanking(rankingRes.data[0].ranking);
        }
      }
    };
    getRanking();
  }, []);

  const save = async () => {
    setSaving(true);
    //TODO: restrict profiles to within sport
    const saveRes = await editRanking(
      rankingID,
      ranking,
      rankingType,
      profile._id
    );
    setSaving(false);
    if (saveRes.status === 200) {
      history.push("/");
    }
  };
  if (rankingData === undefined) {
    return (
      <>
        <CssBaseline>
          <AppBar
            style={{ background: theme.palette.primary.mainGradient }}
            position="relative"
          >
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Edit Ranking
              </Typography>
            </Toolbar>
          </AppBar>
          <main>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}
            >
              <Grid item xs={3}>
                <CircularProgress
                  style={{ color: theme.palette.primary.main, margin: "auto" }}
                ></CircularProgress>{" "}
              </Grid>
            </Grid>
          </main>
        </CssBaseline>
      </>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <AppBar
            style={{ background: theme.palette.primary.mainGradient }}
            position="relative"
          >
            <Toolbar>
              <Link to="/" style={{ color: "white", marginTop: 4 }}>
                <ArrowBack style={{ marginRight: 15 }} />
              </Link>
              <Typography variant="h6" color="inherit" noWrap>
                Edit Ranking
              </Typography>
            </Toolbar>
          </AppBar>
          <main>
            <Container maxWidth="md" style={{ padding: 20 }}>
              <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                  <Select
                    id="ranking-type"
                    fullWidth
                    color="secondary"
                    value={rankingType}
                    onChange={(e) => setRankingType(e.target.value)}
                    style={{ textAlign: "left", height: "100%" }}
                  >
                    {rankingsList.map((type, index) => (
                      <MenuItem value={type}>
                        <Typography
                          variant="h5"
                          style={{
                            fontWeight: "bolder",
                            paddingLeft: 8,
                            fontStyle: "italic",
                          }}
                        >
                          {type}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    id="standard-number"
                    label="Ranking"
                    fullWidth
                    color="secondary"
                    type="number"
                    required
                    value={ranking}
                    onChange={(e) => setRanking(e.target.value)}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <ProfileSearchAutoComplete
                    onSelect={(value) => setProfile(value)}
                    defaultProfile={rankingData.profile}
                  ></ProfileSearchAutoComplete>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Button
                    style={{
                      background: theme.palette.primary.mainGradient,
                      color: "white",
                      borderRadius: 20,
                      fontWeight: "bolder",
                      marginTop: 50,
                      padding: 10,
                    }}
                    fullWidth
                    onClick={save}
                    disabled={saving}
                  >
                    {saving ? (
                      <CircularProgress
                        style={{ color: "white" }}
                      ></CircularProgress>
                    ) : (
                      <Typography
                        variant="subtitle1"
                        style={{ fontWeight: "bolder" }}
                      >
                        SAVE RANKING
                      </Typography>
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </main>
        </CssBaseline>
      </ThemeProvider>
    );
  }
}