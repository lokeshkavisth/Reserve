import React from "react";
import DropDown from "./ui/DropDown";
import Input from "./ui/Input";
import Button from "./ui/Button";
import reserveAPI from "../api/api";
import { useDispatch } from "react-redux";
import { getLocations, getTrips } from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Hero = () => {
  const [locations, setLocations] = React.useState([]);
  const [origin, setOrigin] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await reserveAPI({ method: "GET", route: "/location" });

        if (res && res.locations) {
          const locations = res.locations[0].locations.map(({ district }) => ({
            value: district,
            label: district,
          }));
          setLocations(locations);
          dispatch(getLocations(locations));
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [dispatch]);

  const searchBus = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const params = {
        origin,
        destination,
        departureDate: e.target[2].value,
      };

      const res = await reserveAPI({
        method: "GET",
        route: "/",
        params,
      });

      if (res && res.trips) {
        dispatch(getTrips(res.trips));
        navigate("/trips");
      } else {
        console.error("Unexpected response format:", res);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "API request failed");
      console.error("API request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 md:py-40">
      <div>
        <Toaster />
      </div>
      <div className="space-y-10">
        <div>
          <h1 className="text-center">Book your bus tickets</h1>
        </div>

        <div>
          <form className="space-y-6" onSubmit={searchBus}>
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <DropDown
                options={locations}
                label="Origin"
                placeholder="Select origin"
                required
                onChange={(origin) =>
                  setOrigin(origin.value.toLocaleLowerCase())
                }
              />

              <DropDown
                options={locations}
                label="Destination"
                placeholder="Select destination"
                required
                onChange={(destination) =>
                  setDestination(destination.value.toLocaleLowerCase())
                }
              />

              <Input
                type="date"
                placeholder="Select a date"
                name="departureDate"
                label="Departure Date"
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </section>
            <Button text="Search Buses" type="submit" loading={loading} />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
