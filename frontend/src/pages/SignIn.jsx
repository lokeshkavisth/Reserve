import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { AiTwotoneLock } from "react-icons/ai";
import { AiTwotoneMail } from "react-icons/ai";
import GoogleAuth from "../components/GoogleAuth";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../config/firebase.js";

const SignIn = () => {
  //  const [userError, setUserError] = React.useState('');
  //  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    // console.log(email, password);
    // setLoading((prev) => !prev);

    try {
      const { user } = await signInWithEmailAndPassword(Auth, email, password);
      if (user) navigate("/");
      console.log("Signed In successfully!");
    } catch (error) {
      console.error(error);
      // setUserError("Invalid login credentials");
    }
    // finally {
    //   setLoading((prev) => !prev);
    // }
  };

  return (
    <section className="min-h-screen grid place-items-center max-w-xl mx-auto">
      <div className="w-full border p-4 rounded-md space-y-1">
        <div className="mb-8">
          <h2>SignIn</h2>
          <p>Unlock the smarter way to travel</p>
        </div>
        <form onSubmit={signIn} className="space-y-4">
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
          <Button type="submit" text="SignIn" />
        </form>
        <GoogleAuth />
      </div>
    </section>
  );
};

export default SignIn;
