import Link from "next/link";
import { GiCarWheel } from "react-icons/gi";
import { BiChevronDown } from "react-icons/bi";

const Header = () => {
  return (
    <div className="bg-slate-900 w-full text-white text-sm font-semibold tracking-wide">
      <header className="container mx-auto flex items-center justify-between p-2">
        <Link href="/">
          <GiCarWheel className="text-3xl text-gray-200" />
        </Link>
        <ul className="flex">
          <li className="mx-2">
            <Link
              className="rounded inline-block py-1 px-3 hover:bg-gray-700 duration-500"
              href="/dashboard"
            >
              Dashboard
            </Link>
          </li>
          <li className="mx-2">
            <Link
              className="rounded inline-block py-1 px-3 hover:bg-gray-700 duration-500"
              href="/products"
            >
              Produse
            </Link>
          </li>
          <li className="mx-2">
            <Link
              className="rounded inline-block py-1 px-3 hover:bg-gray-700 duration-500"
              href="/"
            >
              Stocuri
            </Link>
          </li>
          <li className="mx-2">
            <Link
              className="rounded inline-block py-1 px-3 hover:bg-gray-700 duration-500"
              href="/"
            >
              Utilizatori
            </Link>
          </li>
          <li className="mx-2">
            <button className="rounded inline-flex items-center justify-between py-1 px-3 hover:bg-gray-700 duration-500">
              Setari
              <BiChevronDown className="ml-1" />
            </button>
          </li>
        </ul>
        <Link
          className="rounded inline-block py-1 px-3 hover:bg-gray-700 duration-500"
          href="/"
        >
          Login
        </Link>
      </header>
    </div>
  );
};

export default Header;
