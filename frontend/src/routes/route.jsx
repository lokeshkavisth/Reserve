import { lazy } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Contact = lazy(() => import("../pages/Contact"));
const Booking = lazy(() => import("../pages/Booking"));
const SignUp = lazy(() => import("../pages/SignUp"));
const SignIn = lazy(() => import("../pages/SignIn"));
const Register = lazy(() => import("../pages/Register"));
const Trips = lazy(() => import("../pages/Trips"));
const ManageBuses = lazy(() => import("../pages/ManageBuses"));
const Payment = lazy(() => import("../pages/Payment"));

const pagesData = [
  {
    path: "/",
    element: <Home />,
    title: "home",
  },
  {
    path: "/contact",
    element: <Contact />,
    title: "contact",
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    title: "signUp",
  },
  {
    path: "/sign-in",
    element: <SignIn />,
    title: "signIn",
  },
  {
    path: "/trips",
    element: <Trips />,
    title: "trips",
  },
  {
    path: "/bookings",
    element: <Booking />,
    title: "booking",
    requiresAuth: true,
  },
  {
    path: "/register",
    element: <Register />,
    title: "register",
    requiresAuth: true,
  },
  {
    path: "/manage-buses",
    element: <ManageBuses />,
    title: "manage-buses",
    requiresAuth: true,
  },
  {
    path: "/payment",
    element: <Payment />,
    title: "payment",
    requiresAuth: true,
  },
];

const PrivateRoute = ({ element, requiresAuth, path }) => {
  const { user } = useSelector((state) => state.reducer);

  if (requiresAuth && !user.uid) {
    return <Navigate to="/sign-in" />;
  }

  if ((path === "/sign-in" || path === "/sign-up") && user.uid) {
    return <Navigate to="/" />;
  }

  return element;
};

const Router = () => {
  return (
    <Routes>
      {pagesData.map(({ path, title, element, requiresAuth }) => (
        <Route
          key={title}
          path={path}
          element={
            <PrivateRoute
              element={element}
              requiresAuth={requiresAuth}
              path={path}
              title={title}
            />
          }
        />
      ))}
    </Routes>
  );
};

export default Router;
