"use client";

import { useState } from "react";
import Image from "next/image";
import jessicaMercedes from "@/assets/images/about/TalentedTeam/jessica-mercedes.png";
import rosalieMeza from "@/assets/images/about/TalentedTeam/rosalie-meza.png";
import phone from "@/assets/images/phone.png";
import mail from "@/assets/images/mail.png";
import Link from "next/link";

const contacts = [
  {
    image: jessicaMercedes,
    name: "Jessica Mercedes",
    role: "Tech & Execution",
    title: "Director of Data Systems",
    phone: "+123456789",
    email: "jessica@mail.com",
  },
  {
    image: rosalieMeza,
    name: "Rosalie Meza",
    role: "Engagement & Strategy",
    title: "Client Engagement Lead",
    phone: "+987654321",
    email: "rosalie@mail.com",
  },
];

const locations = [
  "San Francisco, USA",
  "Warsaw, Poland",
  "Copenhagen, Denmark",
];

const OfficeLocations = () => {
  const [active, setActive] = useState(locations[0]);

  return (
    <section className="bg-base-200 pt-12 pb-30 relative overflow-hidden max-md:py-10">
      <div className="container grid lg:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-between">
          <div className="space-y-6">
            <h4 className="heading_b_border text-center">Offices</h4>

            <h1>
              Explore Our Office <br /> Locations
            </h1>

            <h3 className="max-w-lg text-justify">
              For specific inquiries, please reach out to our contact
              representatives at each of our headquarters locations.
            </h3>
          </div>

          <div className="space-y-4 pt-6">
            {contacts.map((item, i) => (
              <div
                key={i}
                className="flex max-sm:flex-col items-center bg-neutral-800 border-2 border-neutral-500 rounded-2xl overflow-hidden"
              >
                {/* IMAGE */}
                <div className="relative min-w-32.5 min-h-34.75 max-sm:w-full max-sm:h-72">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="w-full flex justify-between p-5 max-sm:gap-4 max-sm:p-3">
                  {/* LEFT CONTENT */}
                  <div className="flex flex-col justify-between max-sm:gap-2">
                    <p className="font-avenirLtStd heading_b_border uppercase">
                      {item.role}
                    </p>

                    <div className="mt-5 max-sm:mt-2">
                      <h4>{item.name}</h4>
                      <p className="font-avenirLtStd text-neutral-400">
                        {item.title}
                      </p>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-2 max-sm:justify-start">
                    <Link
                      href={`tel:${item.phone}`}
                      className="bg-neutral-200 size-11 rounded-sm flex justify-center items-center border border-neutral-500 max-sm:size-8"
                    >
                      <Image
                        src={phone}
                        alt="phone-icon"
                        width={30}
                        height={30}
                      />
                    </Link>

                    <Link
                      href={`mailto:${item.email}`}
                      className="bg-neutral-200 size-11 rounded-sm flex justify-center items-center border border-neutral-500 max-sm:size-8"
                    >
                      <Image
                        src={mail}
                        alt="mail-icon"
                        width={30}
                        height={30}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="h-full">
          {/* TABS */}
          <div className="flex gap-3 flex-wrap">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setActive(loc)}
                className={`btn btn-sm rounded-md border ${
                  active === loc
                    ? "btn-outline border-primary text-white"
                    : "border-gray-200 text-neutral-400"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* MAP */}
          <div className="w-full h-155.75 rounded-xl overflow-hidden mt-4 max-sm:h-100">
            <iframe
              key={active}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                active,
              )}&z=12&output=embed`}
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeLocations;
