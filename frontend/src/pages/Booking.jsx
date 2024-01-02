import React from "react";
import reserveAPI from "../api/api";
import { useSelector } from "react-redux";
import Card2 from "../components/ui/Card2";
import Skeleton from "../components/ui/Skeleton";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

const Booking = () => {
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { user } = useSelector((state) => state.reducer);

  React.useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await reserveAPI({
          method: "GET",
          route: "/booking",
          params: {
            uid: user.uid,
          },
        });

        if (res && res.success) {
          setBookings(res.bookings);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user.uid]);

  return (
    <article>
      {bookings.length < 1 ? (
        <div className="flex items-center min-h-[70vh] text-center justify-center">
          <div className="space-y-4">
            <h1>No bookings found!</h1>
            <p>Would you like to make a new bus reservation through Reserve?</p>
            <div>
              <Link to={"/"}>
                <Button text="Book Now" className="max-w-max mx-auto" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center mx-auto space-y-8 mb-20">
            <h1>Wheels Up! Explore, Manage, & Track Your Bus Escapes</h1>
            <p>
              Buckle up and explore freedom on four wheels! Your bus travel
              oasis awaits. Dive into past escapes, manage upcoming adventures,
              and track your journey progress in real-time. Get booking-ready
              with ease, dream big, and hit the road with confidence. Every
              winding path starts here.
            </p>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {loading ? (
              <Skeleton />
            ) : (
              bookings.map((booking) => (
                <Card2
                  key={booking._id}
                  busName={booking.busName}
                  origin={booking.origin}
                  destination={booking.destination}
                  fare={booking.amount}
                  arrivalDate={booking.arrivalDate}
                  departureDate={booking.departureDate}
                  departureTime={booking.departureTime}
                  arrivalTime={booking.arrivalTime}
                  isBtnShow={false}
                />
              ))
            )}
          </section>
        </>
      )}
    </article>
  );
};

export default Booking;
