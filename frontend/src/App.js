import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from "./components/Spots/SpotIndex";
import SpotDetails from "./components/Spots/SpotDetails";
import SplashPage from "./components/SplashPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path = "/">
            <SplashPage />
          </Route>
          <Route exact path="/spots">
            <SpotIndex />
          </Route>
          <Route exact path={`/spot/:spotId`}>
              <SpotDetails />
          </Route>
          {/*
          <Route exact path='/spot/:spotId' component={SpotDetails} />

          <Route exact path='/' component={SpotIndex} /> */}
        </Switch>
      )}
    </>
  );
}

export default App;
