import Link from "next/link";

const AddUserButton = ({ label }) => {
  return (
    <Link
      className="font-semibold inline-block bg-orange-500 rounded py-1 px-2 text-white"
      href="/users/add"
    >
      {label}
    </Link>
  );
};

export default AddUserButton;
