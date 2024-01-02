import React from "react";
import { useSelector } from "react-redux";
import Card2 from "../components/ui/Card2";
import Input from "../components/ui/Input";
import DropDown from "../components/ui/DropDown";
import Button from "../components/ui/Button";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import reserveAPI from "../api/api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Message from "../components/ui/Message";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const Payment = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { booking, user } = useSelector((state) => state.reducer);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const proceedToPay = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      setError(null);

      const formData = new FormData(e.target);
      const formValues = Object.fromEntries(formData.entries());

      const cardElement = elements.getElement(CardElement);
      const { token, error: tokenError } = await stripe.createToken(
        cardElement
      );

      const { name } = formValues;

      if (tokenError) {
        setError(tokenError.message);
        toast.error(tokenError.message);
      } else {
        {
          const userPaymentData = {
            amount: booking.fare,
            currency: "usd",
            ...formValues,
            uid: user.uid,
            token: token.id,
            busName: booking.busName,
            departureTime: booking.departureTime,
            arrivalTime: booking.arrivalTime,
            departureDate: booking.departureDate,
            arrivalDate: booking.arrivalDate,
            origin: booking.origin,
            seats: booking.seats,
            destination: booking.destination,
            description: `Payment for bus reservation from ${booking.origin} to ${booking.destination} on ${booking.departureDate} at ${booking.departureTime} for passenger ${formValues.name}.`,
          };

          const res = await reserveAPI({
            method: "POST",
            route: "/booking",
            data: userPaymentData,
          });

          if (res && res.success) {
            const { clientSecret } = res;
            const {
              card: { address_zip },
            } = token;

            const { paymentIntent, error: confirmationError } =
              await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                  card: cardElement,
                  billing_details: {
                    name: name,
                    address: {
                      line1: "1 Main street",
                      city: "San Francisco",
                      postal_code: address_zip,
                      state: "CA",
                      country: "US",
                    },
                  },
                },
                shipping: {
                  name: "Jenny Shipping",
                  address: {
                    line1: "1 Main street",
                    city: "San Francisco",
                    postal_code: "90210",
                    state: "CA",
                    country: "US",
                  },
                },
              });

            if (confirmationError) {
              setError(confirmationError.message);
              toast.error(confirmationError.message);
            } else {
              toast.success("Payment confirmed");
              setError(null);
              navigate("/bookings");
            }
          }
        }
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article>
      <div>
        <Toaster />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="space-y-2">
          <Card2
            key={booking._id}
            busName={booking.busName}
            origin={booking.origin}
            destination={booking.destination}
            amenities={booking.amenities}
            categories={booking.categories}
            fare={booking.fare}
            arrivalDate={booking.arrivalDate}
            departureDate={booking.departureDate}
            departureTime={booking.departureTime}
            arrivalTime={booking.arrivalTime}
            isBtnShow={false}
          />

          <div className="border p-4 rounded-md shadow-sm bg-white space-y-4">
            <h2>Fare Details</h2>
            <ul className="">
              <li className="flex items-center justify-between border-b  py-2">
                <h4>Bus Fare</h4>
                <b>&#8377; {booking.fare}</b>
              </li>
              <li className="flex items-center justify-between border-b py-2">
                <h4>Tax Charges</h4>
                <b>0.00</b>
              </li>
              <li className="flex items-center justify-between border-b  py-2">
                <h4>Other Charges</h4>
                <b>0.00</b>
              </li>
              <li className="flex items-center justify-between  py-2">
                <h4>Total Amount</h4>
                <b>&#8377; {booking.fare}</b>
              </li>
            </ul>
          </div>
        </section>
        <form className="space-y-4" onSubmit={proceedToPay}>
          <Input required name="name" label="Name" placeholder="John Doe" />
          <Input
            required
            type="email"
            name="email"
            label="Email"
            placeholder="johndoe@gmail.com"
          />
          <Input
            required
            type="tel"
            name="phone"
            label="Mobile Number"
            placeholder="+919876543210"
          />
          <Input
            required
            type="number"
            name="age"
            label="Age"
            placeholder="Your age in years"
          />
          <DropDown
            options={genderOptions}
            label="Gender"
            name="gender"
            placeholder="Select your gender"
            required
          />
          <CardElement />
          <Message message={error} />
          <Button type="submit" text="Proceed to pay" loading={loading} />
        </form>
      </section>
    </article>
  );
};

export default Payment;
