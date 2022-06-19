import "./App.css";
import LoginPage from "./Pages/LoginPage";
import PlayerPage from "./Pages/PlayerPage";
import { extractTokenFromUrl } from "./spotify";
import { useEffect, useContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import SpotifyContext from "./Context/SpotifyContext";


function App() {

  // Instance of SpotifyWebApi
  let spotify = new SpotifyWebApi();

  // Using context API
  const values = useContext(SpotifyContext);

  useEffect(() => {
    const obj = extractTokenFromUrl();
    window.location.hash = "";
    const _token = obj.access_token;

    if (_token) {
      // Saving user data in context API
      spotify.setAccessToken(_token);
      values.setToken(_token);

      // Saving token in context API
      spotify.getMe()
      .then(user => values.setUser(user))
      .catch(error => console.log(error));

      // Saving user playlists in context API
      spotify.getUserPlaylists()
      .then(playlists => values.setPlaylists(playlists))
      .catch(error => console.log(error));
    }
    
  }, [values]);

  return (
    <div>
      {values.playlists === null ? <LoginPage /> : <PlayerPage spotify={spotify} />}
    </div>
  );
}

export default App;
