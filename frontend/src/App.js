import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from "./components/Spots/SpotIndex";
import SpotDetails from "./components/Spots/SpotDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  console.log('app component running')
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      console.log('before is loaded')
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {console.log('before spot details route in return')}
          <Route exact path='/spot/:spotId' component={SpotDetails} />
          {console.log('before spot details route in return')}
          <Route exact path='/' component={SpotIndex} />
        </Switch>
      )}
    </>
  );
}

export default App;
