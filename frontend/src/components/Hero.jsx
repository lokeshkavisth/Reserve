import React from "react";
import DropDown from "./ui/DropDown";
import Input from "./ui/Input";
import Button from "./ui/Button";
import reserveAPI from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { getLocations, getTrips } from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [locations, setLocations] = React.useState([]);
  const [origin, setOrigin] = React.useState("");
  const [destination, setDestination] = React.useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selector = useSelector((state) => state.reducer);

  React.useEffect(() => {
    const fetchLocations = async () => {
      const res = await reserveAPI({ method: "GET", route: "/location" });

      const locations = res.locations[0].locations.map(({ district }) => ({
        value: district,
        label: district,
      }));

      setLocations(locations);
      dispatch(getLocations(locations));
    };

    return () => fetchLocations();
  }, [dispatch]);

  const searchBus = async (e) => {
    e.preventDefault();
    // console.log(e.target[2].value);

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

    dispatch(getTrips(res.trips));

    navigate("/trips");
  };
  // console.log("selector", selector);

  return (
    <section className="py-20 md:py-40 ">
      <div className="space-y-10">
        <div>
          <h1 className="text-center">Book your bus tickets</h1>
        </div>

        <div>
          <form className="space-y-6" onSubmit={searchBus}>
            <section className="grid grid-cols-3 gap-2">
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
            <Button text="Search Buses" type="submit" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
