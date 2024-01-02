import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import Button from "./ui/Button";
import { Auth, googleProvider } from "../config/firebase";

const GoogleAuth = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const credential = await signInWithPopup(Auth, googleProvider);
      const { user } = credential;

      if (user) navigate("/");
      console.error("Sign-in with Google failed.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        type="button"
        text="SignIn with Google"
        className="bg-red-500"
        onClick={signInWithGoogle}
      />
    </div>
  );
};

export default GoogleAuth;
