import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import Logo from "./Logo";
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
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (credential) => {
      if (credential) {
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

  const toggleMenu = (e) => {
    const menu = e.target.nextElementSibling;
    e.target.classList.toggle("ring-2");
    e.target.classList.toggle("ring-blue-500");
    menu.classList.toggle("hidden");
  };

  const handleSignUpOrRegister = async () => {
    setLoading(true);
    try {
      await navigate(pathname === "/sign-in" ? "/sign-up" : "/register");
    } catch (error) {
      console.error("Error navigating:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut(Auth);
      setUser(initialUserState);
      dispatch(getCurrentUser(initialUserState));
      navigate("/sign-in");
    } catch (error) {
      console.error("Error signing out", error);
    } finally {
      setLoading(false);
    }
  };

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
                className="h-8 w-8 rounded-md object-cover object-center"
              />
              <div
                id="menu"
                className="min-w-max py-2 border bg-white hidden absolute right-0 mt-1 rounded-md z-10"
              >
                <ul>
                  {user.username && (
                    <h3 className="px-3 pb-2 font-medium border-b capitalize">
                      Hello, {user.username.split(" ")[0]}
                    </h3>
                  )}

                  {user.uid && (
                    <>
                      <li>
                        <Link
                          to={"/register"}
                          className="hover:bg-gray-100 px-3 py-2 block"
                        >
                          Agent Regestration
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/manage-buses"}
                          className="hover:bg-gray-100 px-3 py-2 block"
                        >
                          Manage Buses
                        </Link>
                      </li>
                    </>
                  )}

                  <li className=" px-3 py-2">
                    {user.uid.length > 1 ? (
                      <Button
                        onClick={handleSignOut}
                        className="py-2"
                        text={"Sign-Out"}
                      />
                    ) : (
                      <Button
                        onClick={handleSignUpOrRegister}
                        loading={loading}
                        className="py-2"
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
