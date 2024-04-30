import Link from "next/link";

const PrimaryButton = ({
  role,
  href,
  label,
  disabled,
  type,
  onClick,
  className,
}) => {
  return (
    <>
      {role === "button" ? (
        <button
          type={type}
          className={`${className} inline-block bg-gradient-to-b from-orange-400 via-orange-600 to-red-900 text-white py-1.5 px-10 rounded font-semibold hover:brightness-110 duration-300 disabled:brightness-90 disabled:pointer-events-none`}
          disabled={disabled}
          onClick={onClick}
        >
          {label}
        </button>
      ) : (
        <Link
          className={`${className} inline-block bg-gradient-to-b from-orange-400 via-orange-600 to-red-900 text-white py-1.5 px-10 rounded font-semibold hover:brightness-110 duration-300`}
          href={href}
        >
          {label}
        </Link>
      )}
    </>
  );
};

export default PrimaryButton;
