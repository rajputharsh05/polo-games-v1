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
        colorPrimary: '#940101',
        borderRadius: 2,
        colorText:"red",
        lineWidth:0,

        // Alias Token
        colorBgContainer: 'rgba(21, 21, 21, 1)',
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
