import Link from "next/link";

const SecondaryButton = ({
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
          className={`${className} inline-block bg-gradient-to-b from-stone-500 via-stone-700 to-black text-white py-1.5 px-10 rounded font-semibold hover:brightness-110 duration-300 disabled:brightness-90 disabled:pointer-events-none`}
          disabled={disabled}
          onClick={onClick}
        >
          {label}
        </button>
      ) : (
        <Link
          className={`${className} inline-block bg-gradient-to-b from-stone-500 via-stone-700 to-black text-white py-1.5 px-10 rounded font-semibold hover:brightness-110 duration-300`}
          href={href}
        >
          {label}
        </Link>
      )}
    </>
  );
};

export default SecondaryButton;
