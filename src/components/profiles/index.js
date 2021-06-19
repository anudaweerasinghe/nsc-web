import { CssBaseline } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NewProfile from "./webpages/newProfile";
import ProfilesHome from "./webpages/profilesHome";
import ProfileView from "./webpages/profileView";

import Routes from "../routes";
import EditProfile from "./webpages/editProfile";
import AddCoaches from "./webpages/addCoaches";

export default function Profiles() {
  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route exact path="/profiles" component={ProfilesHome} />
        <Route exact path="/profiles/new" component={NewProfile} />
        <Route exact path="/profiles/edit/:profileID" component={EditProfile} />
        <Route
          exact
          path="/profiles/coaches/:profileID"
          component={AddCoaches}
        />
        <Route exact path="/profiles/:profileID" component={ProfileView} />
        <Route component={Routes} />
      </Switch>
    </Router>
  );
}
