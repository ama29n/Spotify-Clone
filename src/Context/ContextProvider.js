import { useReducer } from "react";
import SpotifyContext from "./SpotifyContext";

const defualtValues = {
  user: null,
  playlists: null,
  token: null,
  playlistId: null,
  list: null,
  playingStatus: false,
  playingSong: null,
  audio: null,
  volume: 1,
};

const reducerFunction = (state, action) => {
  if (action.identifier === "setToken") {
    return {
      ...state,
      token: action.token,
    };
  } else if (action.identifier === "setUser") {
    return {
      ...state,
      user: action.user,
    };
  } else if (action.identifier === "setPlaylists") {
    return {
      ...state,
      playlists: action.playlists,
    };
  } else if (action.identifier === "setPlaylistId") {
    return {
      ...state,
      playlistId: action.playlistId,
    };
  } else if (action.identifier === "setList") {
    return {
      ...state,
      list: action.list,
    };
  } else if (action.identifier === "setPlayingStatus") {
    return {
      ...state,
      playingStatus: action.status,
    };
  } else if (action.identifier === "setPlayingSong") {
    return {
      ...state,
      playingSong: action.song,
    };
  } else if (action.identifier === "setAudio") {
    return {
      ...state,
      audio: action.url !== null ? new Audio(action.url) : null,
    };
  } else if (action.identifier === "setVolume") {
    return {
      ...state,
      volume: action.volume,
    };
  } else if (action.identifier === "setPlayedPart") {
    return {
      ...state,
      playedPart: action.part
    };
  }
};

const ContextProvider = (props) => {
  const [curValues, dispatchFunction] = useReducer(
    reducerFunction,
    defualtValues
  );

  const setToken = (_token) => {
    dispatchFunction({ identifier: "setToken", token: _token });
  };

  const setUser = (_user) => {
    dispatchFunction({ identifier: "setUser", user: _user });
  };

  const setPlaylists = (_playlists) => {
    dispatchFunction({ identifier: "setPlaylists", playlists: _playlists });
  };

  const setPlaylistId = (_listId) => {
    dispatchFunction({ identifier: "setPlaylistId", playlistId: _listId });
  };

  const setList = (_list) => {
    dispatchFunction({ identifier: "setList", list: _list });
  };

  const setPlayingStatus = (_status) => {
    dispatchFunction({ identifier: "setPlayingStatus", status: _status });
  };

  const setPlayingSong = (_song) => {
    dispatchFunction({ identifier: "setPlayingSong", song: _song });
  };

  const setAudio = (url) => {
    dispatchFunction({ identifier: "setAudio", url: url });
  };

  const setVolume = (volume) => {
    dispatchFunction({ identifier: "setVolume", volume: volume})
  };

  const setPlayedPart = (part) => {
    dispatchFunction({ identifier: "setPlayedPart", part: part});
  };

  const values = {
    // for token
    token: curValues.token,
    setToken: setToken,

    // for user data
    user: curValues.user,
    setUser: setUser,

    // for playlists
    playlists: curValues.playlists,
    setPlaylists: setPlaylists,

    // for selected playlist id
    playlistId: curValues.playlistId,
    setPlaylistId: setPlaylistId,

    // for songs list of selected playlist id
    list: curValues.list,
    setList: setList,

    // playing status of song for play and pause
    playingStatus: curValues.playingStatus,
    setPlayingStatus: setPlayingStatus,

    // song that is selected for playing
    playingSong: curValues.playingSong,
    setPlayingSong: setPlayingSong,

    // song that is playable
    audio: curValues.audio,
    setAudio: setAudio,

    // for volume of the song 
    volume: curValues.volume,
    setVolume: setVolume,

    // playedPart
    playedPart: curValues.playedPart,
    setPlayedPart: setPlayedPart
  };

  return (
    <SpotifyContext.Provider value={values}>
      {props.children}
    </SpotifyContext.Provider>
  );
};

export default ContextProvider;
