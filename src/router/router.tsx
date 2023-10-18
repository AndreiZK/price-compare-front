import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes, defaultRoute } from "./routes";

import Layout from "../Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map((route, i) => {
            return (
              <Route
                key={i}
                path={route.path}
                element={route.component}
              ></Route>
            );
          })}
          <Route
            index
            path="/placeholderRoute"
            element={<Navigate to={defaultRoute} replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
