import { useReducer } from "react";
import SpotifyContext from "./SpotifyContext";

const defualtValues = {
  user: null,
  playlists: null,
  token: null,
  list: null
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
  else if(action.identifier === "setList") {
    return {
      ...state,
      list: action.list
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
  };

  const setUser = (_user) => {
    dispatchFunction({ identifier: "setUser", user: _user })
  };

  const setPlaylists = (_playlists) => {
    dispatchFunction({ identifier: "setPlaylists", playlists: _playlists })
  };

  const setList = (_list) => {
    dispatchFunction({ identifier: "setList", list: _list });
  };

  const values = {
    token: curValues.token,
    setToken: setToken,
    user: curValues.user,
    setUser: setUser,
    playlists: curValues.playlists,
    setPlaylists: setPlaylists,
    list: curValues.list,
    setList: setList
  };

  return (
    <SpotifyContext.Provider value={values}>
      {props.children}
    </SpotifyContext.Provider>
  );
};

export default ContextProvider;
