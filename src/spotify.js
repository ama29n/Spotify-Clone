// Scopes provide Spotify users using third-party apps the confidence that only the information 
// they choose to share will be shared, and nothing more.

// Referring Doc for scopes
// https://developer.spotify.com/documentation/general/guides/authorization/scopes/
const scopes = [
    "user-read-currently-playing", 
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state"
];



// Referring Doc for login authorization
// https://developer.spotify.com/documentation/general/guides/authorization/code-flow/

// Url for auth
const authEndpoint = "https://accounts.spotify.com/authorize";

// CLient Id
const clientId = "6c0d873ec63f41868491e4b5591f4f95";

// Redirect URI 
const redirectUri = "http://localhost:3000/";

const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}
                            &response_type=token&show_dialog=true`;



// Referring Doc for window.location
// https://developer.mozilla.org/en-US/docs/Web/API/Location

const extractTokenFromUrl = () => {
    return window.location.hash // This will return the string from '#'
    .substring(1)               // This will remove the first character
    .split("&")                 // This will split the string by removing '&' and we will get an array
    // converting params to object key value pair 
    .reduce((initial, param) => {
        var [paramName, paramValue] = param.split("=");
        return initial[paramName] = decodeURIComponent(paramValue);
    }, {});
};

export {loginUrl, extractTokenFromUrl};