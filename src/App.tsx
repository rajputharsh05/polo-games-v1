import { BrowserRouter } from "react-router-dom";
import "./App.css";
import GlobalRouter from "./Routes/GlobalRouter";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
