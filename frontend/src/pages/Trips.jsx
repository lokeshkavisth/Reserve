import React from "react";
import Card2 from "../components/ui/Card2";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../components/ui/DropDown";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import reserveAPI from "../api/api";
import { getTrips } from "../redux/actions/actions";
import Skeleton from "../components/ui/Skeleton";

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
  const [origin, setOrigin] = React.useState(null);
  const [destination, setDestination] = React.useState(null);
  const [arrivalDate, setArrivalDate] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [amenities, setAmenities] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const selector = useSelector((state) => state.reducer);
  const { locations, trips } = selector;
  // console.log("selector", selector);

  const filterResults = async (e) => {
    setLoading((prev) => !prev);
    e.preventDefault();

    const formValues = {};
    const formData = new FormData(e.target);

    if (origin && origin.value) {
      formValues["origin"] = origin.value.toLocaleLowerCase();
    }

    if (destination && destination.value) {
      formValues["destination"] = destination.value.toLocaleLowerCase();
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
    console.log("s", origin?.value, destination?.value, formData);

    try {
      const res = await reserveAPI({
        method: "GET",
        route: "/",
        params: formValues,
      });

      if (res && res.trips) {
        dispatch(getTrips(res.trips));
      }
    } catch (error) {
      console.error(error);
      dispatch(getTrips([]));
    } finally {
      setLoading((prev) => !prev);
    }
  };

  const handleDepartureDate = (e) => {
    const threeDaysLater = new Date(e.target.value);
    threeDaysLater.setDate(threeDaysLater.getDate() + 4);
    setArrivalDate(threeDaysLater.toISOString().split("T")[0]);
  };

  const resetFilters = () => {
    setOrigin(null);
    setDestination(null);
    setArrivalDate("");
    setCategories([]);
    setAmenities([]);

    // Reset the form directly
    const form = document.getElementById("filterForm");
    form.reset();

    // Clear dropdown selections
    const dropdowns = form.querySelectorAll("select");
    dropdowns.forEach((dropdown) => {
      dropdown.value = null; // Set to null to clear the selection
    });
  };

  return (
    <section className="grid grid-cols-6 gap-2 items-start">
      {/* filters */}
      <aside className="bg-white p-4 col-span-2 border rounded-md shadow-sm sticky top-[75px]">
        {/* origin */}
        <form id="filterForm" className="space-y-8" onSubmit={filterResults}>
          <section className="space-y-4">
            <DropDown
              options={locations}
              label="Origin"
              placeholder="Select origin"
              value={origin}
              onChange={(data) => setOrigin(data)}
            />
            {/* destination  */}
            <DropDown
              options={locations}
              label="Destination"
              placeholder="Select destination"
              value={destination}
              onChange={(data) => setDestination(data)}
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
              value={categories}
              isMulti
              onChange={(category) => setCategories(category)}
            />
            {/* amenities  */}
            <DropDown
              options={amenityOptions}
              label="Amenities"
              placeholder="Select an amenity"
              value={amenities}
              isMulti
              onChange={(amenity) => setAmenities(amenity)}
            />
          </section>
          <div className="space-y-4">
            <Button type="submit" text="Apply Filters" loading={loading} />
            <Button
              type="button"
              text="Clear Selections"
              className={"bg-red-500"}
              onClick={resetFilters}
            />
          </div>
        </form>
      </aside>

      {/* trips */}
      <div className="col-span-4 flex flex-col gap-2 relative">
        {trips.length > 0 ? (
          loading ? (
            <Skeleton />
          ) : (
            trips.map((trip) => (
              <Card2
                key={trip._id}
                id={trip._id}
                busName={trip.busName}
                origin={trip.origin}
                destination={trip.destination}
                amenities={trip.amenities}
                categories={trip.categories}
                fare={trip.fare}
                arrivalDate={trip.arrivalDate}
                departureDate={trip.departureDate}
                departureTime={trip.departureTime}
                arrivalTime={trip.arrivalTime}
              />
            ))
          )
        ) : (
          <div>
            <p>No matching trips found!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Trips;
