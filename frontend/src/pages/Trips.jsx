import React from "react";
import Card2 from "../components/ui/Card2";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../components/ui/DropDown";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import reserveAPI from "../api/api";
import { getTrips } from "../redux/actions/actions";

const amenityOptions = [
  {
    value: "water bottle",
    label: "Water Bottle",
  },
  {
    value: "blackets",
    label: "Blankets",
  },
  {
    value: "charging point",
    label: "Charging Point",
  },
  {
    value: "movie",
    label: "Movie",
  },
  {
    value: "toilet",
    label: "Toilet",
  },
  {
    value: "emergency contact number",
    label: "Emergency Contact Number",
  },
];

const categoryOptions = [
  {
    value: "ac",
    label: "AC",
  },
  {
    value: "seater",
    label: "Seater",
  },
  {
    value: "sleeper",
    label: "Sleeper",
  },
  {
    value: "non ac",
    label: "Non AC",
  },
];

const Trips = () => {
  const [amenities, setAmenities] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [origin, setOrigin] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [arrivalDate, setArrivalDate] = React.useState("");

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const selector = useSelector((state) => state.reducer);
  const { locations, trips } = selector;
  console.log("selector", selector);

  const filterResults = async (e) => {
    e.preventDefault();

    const formValues = {};
    const formData = new FormData(e.target);

    // formValues["uid"] = user.uid;
    if (origin !== "") {
      formValues["origin"] = origin.toLocaleLowerCase();
    }

    if (destination !== "") {
      formValues["destination"] = destination.toLocaleLowerCase();
    }

    if (amenities.length > 0) {
      formValues["amenities"] = amenities.map((amenity) =>
        amenity.value.toLocaleLowerCase()
      );
    }
    if (categories.length > 0) {
      formValues["categories"] = categories.map((category) =>
        category.value.toLocaleLowerCase()
      );
    }

    formData.forEach((value, key) => {
      if (value !== "") {
        formValues[key] = value.toLocaleLowerCase();
      }
    });

    try {
      const res = await reserveAPI({
        method: "GET",
        route: "/",
        params: formValues,
      });

      dispatch(getTrips(res.trips));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDepartureDate = (e) => {
    const threeDaysLater = new Date(e.target.value);
    threeDaysLater.setDate(threeDaysLater.getDate() + 4);
    setArrivalDate(threeDaysLater.toISOString().split("T")[0]);
  };

  return (
    <section className="grid grid-cols-6 gap-2 items-start">
      {/* filters */}
      <aside className="bg-white p-4 col-span-2 border rounded-md shadow-sm">
        {/* origin */}
        <form className="space-y-8" onSubmit={filterResults}>
          <section className="space-y-4">
            <DropDown
              options={locations}
              label="Origin"
              placeholder="Select origin"
              onChange={(origin) => setOrigin(origin.value)}
            />
            {/* destination  */}
            <DropDown
              options={locations}
              label="Destination"
              placeholder="Select destination"
              onChange={(destination) => setDestination(destination.value)}
            />
            {/* departure date  */}
            <Input
              type="date"
              placeholder="Select a date"
              name="departureDate"
              label="Departure Date"
              onChange={handleDepartureDate}
              min={new Date().toISOString().split("T")[0]}
            />
            {/* arrival date  */}
            <Input
              type="date"
              placeholder="Select a date"
              name="arrivalDate"
              label="Arrival Date"
              min={arrivalDate}
            />
            {/* category  */}
            <DropDown
              options={categoryOptions}
              label="Category"
              placeholder="Bus category"
              isMulti
              onChange={(category) => setCategories(category)}
            />
            {/* amenities  */}
            <DropDown
              options={amenityOptions}
              label="Amenities"
              placeholder="Select an amenity"
              isMulti
              onChange={(amenity) => setAmenities(amenity)}
            />
          </section>
          <Button type="submit" text="Search" />
        </form>
      </aside>

      {/* trips */}
      <div className="col-span-4 flex flex-col gap-2">
        {trips.map((trip) => (
          <Card2
            key={trip._id}
            busName={trip.busName}
            amenities={trip.amenities}
            categories={trip.categories}
            fare={trip.fare}
            arrivalDate={trip.arrivalDate}
            departureDate={trip.departureDate}
            departureTime={trip.departureTime}
            arrivalTime={trip.arrivalTime}
          />
        ))}
      </div>
    </section>
  );
};

export default Trips;
