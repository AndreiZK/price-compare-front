import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import MainPage from "../views/MainPage";

const defaultRoute = "/signup";

const routes = [
  {
    path: "/signup",
    component: <SignupForm />,
  },
  {
    path: "/login",
    component: <LoginForm />,
  },
  {
    path: "/",
    component: <MainPage />,
  },
];

export { defaultRoute, routes };
