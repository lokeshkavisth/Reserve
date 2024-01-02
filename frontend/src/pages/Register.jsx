import React from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import DropDown from "../components/ui/DropDown";
import reserveAPI from "../api/api";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { seats as seatRows } from "../data/data.json";
import { useNavigate } from "react-router-dom";

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
  const [arrivalDate, setArrivalDate] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const selector = useSelector((state) => state.reducer);
  const navigate = useNavigate();

  const register = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formValues = {};
    const formData = new FormData(e.target);

    formValues["uid"] = selector.user.uid;
    formValues["seats"] = seats.map((seat) => seat.value);
    formValues["amenities"] = amenities.map((amenity) => amenity.value);
    formValues["categories"] = categories.map((category) => category.value);

    formData.forEach((value, key) => {
      if (value !== "") {
        formValues[key] = value.toLocaleLowerCase();
      }
    });

    try {
      const res = await reserveAPI({
        method: "POST",
        route: "/",
        data: formValues,
      });

      if (res && res.trip) {
        toast.success("Registration successful!");
        navigate("/manage-buses");
      }
    } catch (error) {
      console.error("API request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDepartureDate = (e) => {
    const threeDaysLater = new Date(e.target.value);
    threeDaysLater.setDate(threeDaysLater.getDate() + 4);
    setArrivalDate(threeDaysLater.toISOString().split("T")[0]);
  };

  return (
    <section>
      <div>
        <Toaster />
      </div>
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
              name="origin"
              placeholder="Origin"
              required
            />
            <DropDown
              options={selector.locations}
              label="Destination"
              name="destination"
              placeholder="Destination"
              required
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
              options={seatRows}
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

          <Button type="submit" text="Register your bus" loading={loading} />
        </form>
      </div>
    </section>
  );
};

export default Register;
