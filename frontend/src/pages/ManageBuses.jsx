import React from "react";
import reserveAPI from "../api/api";
import { useSelector } from "react-redux";
import Card3 from "../components/ui/Card3";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const ManageBuses = () => {
  const [busList, setBusList] = React.useState([]);

  const { user } = useSelector((state) => state.reducer);
  React.useEffect(() => {
    const fetchBusList = async () => {
      try {
        const res = await reserveAPI({
          method: "GET",
          route: "/",
          params: { uid: user.uid },
        });

        if (res && res.trips) {
          setBusList(res.trips);
        }
      } catch (error) {
        console.error("Error fetching bus list:", error);
      }
    };

    fetchBusList();
  }, [user.uid]);

  return (
    <article>
      {busList.length < 1 ? (
        <div className="flex items-center min-h-[70vh] text-center justify-center">
          <div className="space-y-4">
            <h1>No buses found!</h1>
            <p>
              It looks like you haven&rsquo;t added any buses yet. Start
              managing your buses to view them here.
            </p>
            <div>
              <Link to={"/register"}>
                <Button
                  text="Register Your Bus"
                  className="max-w-max mx-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <section className="text-center mx-auto space-y-8 mb-20">
            <h1>Manage Your Buses</h1>
            <p>
              Welcome to the bus management page. Here, you can view and manage
              details of your buses.
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2">
            {busList.map((bus) => (
              <Card3
                key={bus._id}
                busNumber={bus.busNumber}
                origin={bus.origin}
                destination={bus.destination}
                departureDate={bus.departureDate}
                arrivalDate={bus.arrivalDate}
                departureTime={bus.departureTime}
                arrivalTime={bus.arrivalTime}
                seats={bus.seats.length}
              />
            ))}
          </section>
        </div>
      )}
    </article>
  );
};

export default ManageBuses;
