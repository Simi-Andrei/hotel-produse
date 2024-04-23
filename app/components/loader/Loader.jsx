import { CgSpinner } from "react-icons/cg";

const Loader = () => {
  return (
    <div className="h-full grid place-items-center">
      <CgSpinner className="animate-spin text-2xl" />
    </div>
  );
};

export default Loader;
