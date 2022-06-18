import "./App.css";
import LoginPage from "./Pages/LoginPage";
import { extractTokenFromUrl } from "./spotify";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    const obj = extractTokenFromUrl();
    console.log(obj);
  }, [window.location])

  return (
    <div>
      <LoginPage />
    </div>
  );
}

export default App;
