import { Route, Routes } from "react-router-dom";
import { proctectedRoutes } from "./Routes";
import ProtectedLayout from "../Layouts/ProtectedLayout";

export const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<ProtectedLayout></ProtectedLayout>}>
        {proctectedRoutes.map(({ path, element }) => (
          <Route path={path} element={<>{element}</>} key={path} />
        ))}
      </Route>
    </Routes>
  );
};
