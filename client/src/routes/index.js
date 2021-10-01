import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

export default function Routes() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        <Switch>
          {/* Route Admin */}

          {/* Route Client */}
          <Route path="/">
            <Switch>
              <Route path="/" exact>
                <Home></Home>
              </Route>
              <Route path="/login" exact>
                <Login></Login>
              </Route>
              <Route path="/register" exact>
                <Register></Register>
              </Route>
            </Switch>
          </Route>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}
