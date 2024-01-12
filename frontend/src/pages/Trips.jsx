import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card2 from "../components/ui/Card2";
import DropDown from "../components/ui/DropDown";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import reserveAPI from "../api/api";
import { getTrips } from "../redux/actions/actions";
import { busAmenities, busCategories } from "../data/data.json";
import { LuFilter } from "react-icons/lu";

const Trips = () => {
  const [origin, setOrigin] = React.useState(null);
  const [destination, setDestination] = React.useState(null);
  const [arrivalDate, setArrivalDate] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [amenities, setAmenities] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.reducer);
  const { locations, trips } = selector;

  const filterResults = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formValues = {
      origin: origin?.value?.toLocaleLowerCase(),
      destination: destination?.value?.toLocaleLowerCase(),
      amenities: amenities.map((amenity) => amenity.value.toLocaleLowerCase()),
      categories: categories.map((category) =>
        category.value.toLocaleLowerCase()
      ),
    };

    const formData = new FormData(e.target);

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

      if (res && res.trips) {
        dispatch(getTrips(res.trips));
      }
    } catch (error) {
      console.error(error);
      dispatch(getTrips([]));
    } finally {
      setLoading(false);
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

    const form = document.getElementById("filterForm");
    form.reset();

    const dropdowns = form.querySelectorAll("select");
    dropdowns.forEach((dropdown) => {
      dropdown.value = null;
    });
  };

  const skeletonProps = React.useMemo(
    () => [
      { height: "6", width: "w-28" },
      { colSpan: 2 },
      { colSpan: 2 },
      { colSpan: 2 },
    ],
    []
  );

  const toggleFilterMenu = () => {
    const filters = document.getElementById("filters");
    filters.classList.toggle("hidden");
  };

  return (
    <>
      <div className="md:hidden fixed top-[70px] z-30">
        <Button
          onClick={toggleFilterMenu}
          className="flex items-center gap-1 py-1 bg-blue-50 text-black"
          text={
            <>
              Filters <LuFilter />
            </>
          }
        />
      </div>
      <section className="grid grid-cols-6 gap-2 items-start relative">
        <aside
          id="filters"
          className={`absolute bg-white p-4 w-full md:col-span-2 border rounded-md shadow-sm md:sticky top-0 md:top-[75px] z-20 hidden md:block backdrop-blur`}
        >
          <form id="filterForm" className="space-y-8" onSubmit={filterResults}>
            <section className="space-y-4">
              <DropDown
                options={locations}
                label="Origin"
                placeholder="Select origin"
                value={origin}
                onChange={(data) => setOrigin(data)}
              />
              <DropDown
                options={locations}
                label="Destination"
                placeholder="Select destination"
                value={destination}
                onChange={(data) => setDestination(data)}
              />
              <Input
                type="date"
                placeholder="Select a date"
                name="departureDate"
                label="Departure Date"
                onChange={handleDepartureDate}
                min={new Date().toISOString().split("T")[0]}
              />
              <Input
                type="date"
                placeholder="Select a date"
                name="arrivalDate"
                label="Arrival Date"
                min={arrivalDate}
              />
              <DropDown
                options={busCategories}
                label="Category"
                placeholder="Bus category"
                value={categories}
                isMulti
                onChange={(category) => setCategories(category)}
              />
              <DropDown
                options={busAmenities}
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

        <div className="col-span-6 md:col-span-4 flex flex-col gap-2 relative">
          {trips.length > 0 ? (
            loading ? (
              <Skeleton rowProps={skeletonProps} />
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
    </>
  );
};

export default Trips;
