import Link from "next/link";

const AddProductButton = ({ label }) => {
  return (
    <Link
      className="font-semibold inline-block bg-orange-500 rounded py-1 px-2 text-white"
      href="/products/add"
    >
      {label}
    </Link>
  );
};

export default AddProductButton;
