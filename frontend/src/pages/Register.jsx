import React from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import DropDown from "../components/ui/DropDown";
import reserveAPI from "../api/api";
import { useSelector } from "react-redux";

const seatOptions = [
  { value: "A1", label: "A1" },
  { value: "A2", label: "A2" },
  { value: "A3", label: "A3" },
  { value: "A4", label: "A4" },
  { value: "A5", label: "A5" },
  { value: "A6", label: "A6" },
  { value: "A7", label: "A7" },
  { value: "A8", label: "A8" },
  { value: "A9", label: "A9" },
  { value: "B1", label: "B1" },
  { value: "B2", label: "B2" },
  { value: "B3", label: "B3" },
  { value: "B4", label: "B4" },
  { value: "B5", label: "B5" },
  { value: "B6", label: "B6" },
  { value: "B7", label: "B7" },
  { value: "B8", label: "B8" },
  { value: "B9", label: "B9" },
  { value: "C1", label: "C1" },
  { value: "C2", label: "C2" },
  { value: "C3", label: "C3" },
  { value: "C4", label: "C4" },
  { value: "C5", label: "C5" },
  { value: "C6", label: "C6" },
  { value: "C7", label: "C7" },
  { value: "C8", label: "C8" },
  { value: "C9", label: "C9" },
  { value: "D1", label: "D1" },
  { value: "D2", label: "D2" },
  { value: "D3", label: "D3" },
  { value: "D4", label: "D4" },
  { value: "D5", label: "D5" },
];

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

const Register = () => {
  const [seats, setSeats] = React.useState([]);
  const [amenities, setAmenities] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [origin, setOrigin] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [arrivalDate, setArrivalDate] = React.useState("");
  const selector = useSelector((state) => state.reducer);

  const register = async (e) => {
    e.preventDefault();

    const formValues = {};
    const formData = new FormData(e.target);

    formValues["uid"] = selector.user.uid;
    formValues["origin"] = origin;
    formValues["destination"] = destination;
    formValues["seats"] = seats.map((seat) => seat.value);
    formValues["amenities"] = amenities.map((amenity) => amenity.value);
    formValues["categories"] = categories.map((category) => category.value);

    formData.forEach((value, key) => {
      formValues[key] = value;
    });

    try {
      const res = await reserveAPI({
        method: "POST",
        route: "/",
        data: formValues,
      });

      console.log("res", res);
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
    <section>
      <div className="text-center mx-auto space-y-8 mb-20">
        <h1>Bus Agent Registration Portal</h1>
        <p>
          Welcome to our Bus Agent Registration Portal &#8211; your gateway to
          showcase and manage your fleet of buses seamlessly. Join our network
          of trusted bus operators and unlock a world of opportunities. By
          registering your buses with us, you gain access to a vast audience of
          travelers, increase your visibility, and streamline your operations.
        </p>
      </div>

      <div>
        <form className="space-y-4" onSubmit={register}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              name="busName"
              label="Bus Name"
              required
              placeholder="Company name"
            />

            <Input
              name="busNumber"
              label="Bus Number"
              required
              placeholder="Bus number"
            />

            <DropDown
              options={selector.locations}
              label="Origin"
              placeholder="Origin"
              required
              onChange={(origin) => setOrigin(origin.value)}
            />
            <DropDown
              options={selector.locations}
              label="Destination"
              placeholder="Destination"
              required
              onChange={(destination) => setDestination(destination.value)}
            />

            <Input
              type="date"
              name="departureDate"
              label="Departure Date"
              required
              placeholder="Departure date"
              onChange={handleDepartureDate}
              min={new Date().toISOString().split("T")[0]}
            />
            <Input
              type="date"
              name="arrivalDate"
              label="Arrival Date"
              required
              placeholder="Arrival Date"
              min={arrivalDate}
            />

            <Input
              type="time"
              name="departureTime"
              label="Departure Time"
              required
              placeholder="Departure time"
            />
            <Input
              type="time"
              name="arrivalTime"
              label="Arrival Time"
              required
              placeholder="Arrival time"
            />

            <DropDown
              options={categoryOptions}
              label="Category"
              placeholder="Bus category"
              required
              isMulti
              onChange={(category) => setCategories(category)}
            />

            <DropDown
              options={amenityOptions}
              label="Amenities"
              placeholder="Select an amenity"
              required
              isMulti
              onChange={(amenity) => setAmenities(amenity)}
            />

            <DropDown
              options={seatOptions}
              label="Seats"
              placeholder="Select seats"
              required
              isMulti
              onChange={(seat) => setSeats(seat)}
            />

            <Input
              type="number"
              name="fare"
              label="Fare"
              required
              placeholder="Trip fare"
            />
          </div>

          <Button type="submit" text="Register your bus" />
        </form>
      </div>
    </section>
  );
};

export default Register;
