import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import GlobalRouter from "./Routes/GlobalRouter";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import { AdminRouter } from "./Routes/AdminRoutes";

function App() {
  useEffect(() => {
    const disableContextMenu = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', disableContextMenu);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
    };
  }, []);

  return (
    <>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#940101",
              borderRadius: 2,
              lineWidth: 0,
              // Alias Token
              colorBgContainer:
                "background: linear-gradient(180deg, #0C2E37 -16.64%, #000000 100%);",
            },
          }}
        >
          <BrowserRouter>
            <GlobalRouter />
            <AdminRouter />
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    </>
  );
}

export default App;
