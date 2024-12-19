import { BrowserRouter } from "react-router-dom";
import "./App.css";
import GlobalRouter from "./Routes/GlobalRouter";
import { ConfigProvider } from "antd";
import { AdminRouter } from "./Routes/AdminRoutes";

function App() {
  return (
    <>
      <ConfigProvider
      theme={{
       token: {
        // Seed Token
        colorPrimary: '#940101',
        borderRadius: 2,
        lineWidth:0,
        // Alias Token
        colorBgContainer: 'background: linear-gradient(180deg, #0C2E37 -16.64%, #000000 100%);',
      },
    }}
      >
        <BrowserRouter>
          <GlobalRouter />
          <AdminRouter />
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
