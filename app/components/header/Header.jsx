"use client";

import Link from "next/link";
import { useState } from "react";
import { GiCarWheel } from "react-icons/gi";
import { BiChevronDown } from "react-icons/bi";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { data: session } = useSession();

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
              href="/users"
            >
              Utilizatori
            </Link>
          </li>
          <li className="mx-2 relative">
            <button
              onClick={() => setSettingsMenuOpen((prevState) => !prevState)}
              className="rounded inline-flex items-center justify-between py-1 px-3 hover:bg-gray-700 duration-500"
            >
              Setari
              <BiChevronDown className="ml-1" />
            </button>
            {settingsMenuOpen && (
              <div className="bg-white w-36 absolute right-0 top-10 rounded shadow text-black border border-gray-100 z-50">
                <ul className="text-right py-2">
                  <li>
                    <Link
                      onClick={() => setSettingsMenuOpen(false)}
                      className="block p-1.5 hover:bg-gray-100 duration-300"
                      href="/settings/general"
                    >
                      Setari generale
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
        {session?.user ? (
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen((prevState) => !prevState)}
              className="bg-slate-800 border border-slate-600 hover:brightness-90 py-1 px-6 rounded duration-300"
              type="button"
            >
              {session?.user?.name}
            </button>
            {userMenuOpen && (
              <div className="bg-white w-36 absolute right-0 top-10 rounded shadow text-black border border-gray-100 z-50">
                <ul className="text-right py-2">
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="block p-1.5 w-full text-right hover:bg-gray-100 duration-300"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div />
        )}
      </header>
    </div>
  );
};

export default Header;
