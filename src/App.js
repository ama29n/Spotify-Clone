import "./App.css";
import LoginPage from "./Pages/LoginPage";
import PlayerPage from "./Pages/PlayerPage";
import { extractTokenFromUrl } from "./spotify";
import { useEffect, useContext } from "react";
import SpotifyContext from "./Context/SpotifyContext";


function App() {

  // Using context API
  const values = useContext(SpotifyContext);

  useEffect(() => {
    const obj = extractTokenFromUrl();
    window.location.hash = "";
    const _token = obj.access_token;
    if (_token) {
      // Saving user data in context API
      values.setToken(_token);
    }
    
  }, [values]);

  return (
    <div>
      {values.token === null ? <LoginPage /> : <PlayerPage />}
    </div>
  );
}

export default App;
