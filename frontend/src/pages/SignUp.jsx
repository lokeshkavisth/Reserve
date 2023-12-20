import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiTwotoneMail } from "react-icons/ai";
import GoogleAuth from "../components/GoogleAuth";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Auth } from "../config/firebase.js";
import { PiUserDuotone } from "react-icons/pi";
import { AiTwotoneLock } from "react-icons/ai";

const SignUp = () => {
  //  const [userError, setUserError] = React.useState('');
  //  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // console.log(username, email, password);
    // setLoading((prev) => !prev);

    await createUserWithEmailAndPassword(Auth, email, password)
      .then(({ user }) => {
        updateProfile(user, {
          displayName: username,
        });

        console.log("User registered successfully!");
        // console.log("up", user);
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
        // setUserError(
        //   "Email already in use, please try to signIn or try with diffrent email"
        // );
      });

    // setLoading((prev) => !prev);
  };

  return (
    <section className="min-h-screen grid place-items-center max-w-xl mx-auto">
      <div className="w-full border p-4 rounded-md space-y-1">
        <div className="mb-8">
          <h2>SignUp</h2>
          <p>Unlock the smarter way to travel</p>
        </div>
        <form onSubmit={signUp} className="space-y-4">
          <Input
            type="text"
            name="username"
            label="Username"
            required
            placeholder="fakeuser"
            icon={<PiUserDuotone />}
          />
          <Input
            type="email"
            name="email"
            label="Email"
            required
            placeholder="fakemail@gmail.com"
            icon={<AiTwotoneMail />}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            required
            placeholder="Fake@123"
            icon={<AiTwotoneLock />}
          />
          <Button type="submit" text="SignUp" />
        </form>
        <GoogleAuth />
      </div>
    </section>
  );
};

export default SignUp;
