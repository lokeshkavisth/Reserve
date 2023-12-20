import { ImSpinner } from "react-icons/im";

const Loader = () => {
  return (
    <div className="min-h-[80vh] grid place-items-center w-full text-xl md:text-3xl">
      <ImSpinner />
    </div>
  );
};

export default Loader;
