import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import Logo from "./Logo";
import React from "react";
import { getCurrentUser } from "../redux/actions/actions";
import { Auth } from "../config/firebase";
import Button from "./ui/Button";
import fakeAvatar from "../assets/fake_user.png";

const pages = [
  {
    page: "Home",
    path: "/",
  },
  {
    page: "Contact",
    path: "/contact",
  },
  {
    page: "Bookings",
    path: "/bookings",
  },
];

const initialUserState = {
  username: "",
  email: "",
  profile: "",
  uid: "",
};

const Navbar = () => {
  const [user, setUser] = React.useState(initialUserState);
  // const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  // const selector = useSelector((state) => state.reducer);

  const toggleMenu = (e) => {
    const menu = document.getElementById("menu");
    e.target.classList.toggle("ring-2");
    menu.classList.toggle("hidden");
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (credential) => {
      if (credential) {
        // const { email, displayName, photoURL, uid } = credential;

        const currentUser = {
          username: credential.displayName || "",
          email: credential.email || "",
          profile: credential.photoURL || "",
          uid: credential.uid || "",
        };

        setUser(currentUser);
        dispatch(getCurrentUser(currentUser));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const register = () => {
    // setLoading((prev) => !prev);
    pathname === "/sign-in" ? navigate("/sign-up") : navigate("/sign-in");
    // setLoading((prev) => !prev);
  };

  /////////////////

  const logOut = async () => {
    // setLoading((prev) => !prev);

    try {
      await signOut(Auth);
      setUser(initialUserState);
      dispatch(getCurrentUser(initialUserState));
      navigate("/sign-in");
    } catch (error) {
      console.error("Error signing out", error);
    } finally {
      // setLoading((prev) => !prev);
    }
  };

  // console.log("user", user);
  // console.log("store", selector);

  return (
    <header className="border-b sticky top-0 w-full z-50 bg-white bg-opacity-50 backdrop-blur">
      <section className="flex items-center justify-between max-w-7xl mx-auto py-4 px-2">
        <div>
          <Logo />
        </div>
        <div className="flex items-center gap-4">
          <nav>
            <ul className="flex items-center gap-3 ">
              {pages.map(({ page, path }) => (
                <li key={page}>
                  <Link to={path}>{page}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="relative">
              <img
                onClick={toggleMenu}
                src={user.profile ? user.profile : fakeAvatar}
                alt="profile"
                className="h-8 w-8 rounded-lg object-cover object-center"
              />
              <div
                id="menu"
                className="min-w-max py-2 border bg-slate-100 hidden absolute right-0 mt-1 rounded-lg z-10"
              >
                <ul>
                  {user.username && (
                    <h3 className="px-3 pb-2 font-medium border-b capitalize">
                      Hello, {user.username.split(" ")[0]}
                    </h3>
                  )}

                  {user.uid && (
                    <li className="hover:bg-slate-200 px-3 py-2">
                      <Link to={"/register"}>Agent Regestration</Link>
                    </li>
                  )}

                  <li className=" px-3 py-2">
                    {user.uid.length > 1 ? (
                      <Button
                        onClick={logOut}
                        className="py-2 text-sm"
                        text={"Sign-Out"}
                      />
                    ) : (
                      <Button
                        onClick={register}
                        className="py-2 text-sm"
                        text={pathname === "/sign-in" ? "Sign-up" : "Register"}
                      />
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Navbar;
