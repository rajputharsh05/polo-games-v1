import { BrowserRouter } from "react-router-dom";
import "./App.css";
import GlobalRouter from "./Routes/GlobalRouter";
import { ConfigProvider } from "antd";

function App() {
  return (
    <>
      <ConfigProvider
      theme={{
       token: {
        // Seed Token
        colorPrimary: 'black',
        borderRadius: 2,
        colorText:"white",
        lineWidth:0,

        // Alias Token
        colorBgContainer: 'background: linear-gradient(180deg, #0C2E37 -16.64%, #000000 100%);',
      },
    }}
      >
        <BrowserRouter>
          <GlobalRouter />
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
