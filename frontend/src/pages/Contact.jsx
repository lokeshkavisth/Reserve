import { PiChatCenteredDuotone } from "react-icons/pi";
import { FaLocationArrow } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import Card from "../components/ui/Card";

const Contact = () => {
  return (
    <section>
      <div className="mx-auto space-y-14">
        <div className="text-center space-y-4">
          <h1>We’d love to hear from you</h1>
          <p>Chat to our friendly team.</p>
        </div>

        <img
          className="object-cover w-full h-64 mt-10 rounded-lg lg:h-96"
          src="https://images.unsplash.com/photo-1568992688065-536aad8a12f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=100"
          alt="reserve team"
        />

        <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-3 sm:grid-cols-2 ">
          <Card
            icon={<PiChatCenteredDuotone />}
            title="Chat to sales"
            desc="Speak to our friendly team."
            link="hello@reserve.com"
          />
          <Card
            icon={<FaLocationArrow />}
            title="Visit us"
            desc="Visit our office HQ.."
            link="100 Smith Street Collingwood VIC 3066 AU"
          />
          <Card
            icon={<MdCall />}
            title="Call us"
            desc="Mon-Fri from 8am to 5pm."
            link="+1 (555) 000-0000"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
