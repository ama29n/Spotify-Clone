import { useReducer } from "react";
import SpotifyContext from "./SpotifyContext";

const defualtValues = {
  user: null,
  playlists: null,
  token: null
};

const reducerFunction = (state, action) => {
  if(action.identifier === "setToken") {
    return {
      token: action.token,
      user: state.user,
      playlists: state.playlists
    };
  }
  else if(action.identifier === "setUser") {
    return {
      token: state.token,
      user: action.user,
      playlists: state.playlists
    };
  }
  else if(action.identifier === "setPlaylists") {
    return {
      ...state,
      playlists: action.playlists
    };
  }
};

const ContextProvider = (props) => {
  const [curValues, dispatchFunction] = useReducer(
    reducerFunction,
    defualtValues
  );

  const setToken = (_token) => {
    dispatchFunction({ identifier: "setToken", token: _token })
  }

  const setUser = (_user) => {
    dispatchFunction({ identifier: "setUser", user: _user })
  }

  const setPlaylists = (_playlists) => {
    dispatchFunction({ identifier: "setPlaylists", playlists: _playlists })
  }

  const values = {
    token: curValues.token,
    setToken: setToken,
    user: curValues.user,
    setUser: setUser,
    playlists: curValues.playlists,
    setPlaylists: setPlaylists
  };

  return (
    <SpotifyContext.Provider value={values}>
      {props.children}
    </SpotifyContext.Provider>
  );
};

export default ContextProvider;
