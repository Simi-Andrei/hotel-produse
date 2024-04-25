import { CgSpinner } from "react-icons/cg";

const Loader = ({ classname }) => {
  return (
    <div className="h-full grid place-items-center">
      <CgSpinner className={`${classname} animate-spin text-2xl`} />
    </div>
  );
};

export default Loader;
