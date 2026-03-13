"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";

const menu = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Research", path: "/research" },
  { name: "Blockchain", path: "/blockchain" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-neutral/70 backdrop-blur-md sticky top-0 z-50">
        <div className="container h-17.5 flex justify-between items-center">
          <div className="flex-1">
            <h1>
              <Link href="/">
                <Image src={logo} alt="Ampere Labs" width={70} height={70} />
              </Link>
            </h1>
          </div>

          <ul className="flex-1 flex gap-3 max-md:hidden max-lg:gap-1">
            {menu.map((item, index) => (
              <li
                key={index}
                className="font-avenirLtStd rounded-sm hover:bg-neutral-200 px-4 py-1"
              >
                <Link href={item.path} className="leading-none">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex-1 text-end">
            <Button
              label="Book an Appointment"
              variant="primary"
              size="lg"
              className="max-md:hidden"
            />
          </div>

          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-neutral z-50 transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="p-2 absolute right-1 top-1 border-b border-neutral-200"
          onClick={() => setOpen(false)}
        >
          <X size={26} />
        </div>

        <ul className="flex flex-col pt-10 px-6 pb-6 gap-6">
          {menu.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                onClick={() => setOpen(false)}
                className="block text-lg font-avenirLtStd hover:text-primary transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="p-6">
          <Button label="Book an Appointment" variant="primary" size="lg" className="max-md:w-full"/>
        </div>
      </div>
    </>
  );
};

export default Header;
