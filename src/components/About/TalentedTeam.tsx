import Image from "next/image";
import React from "react";

const teamData = [
  {
    id: 1,
    name: "James Anderson",
    role: "CEO & Co-Founder",
    image: "/images/team/james-anderson.jpg",
  },
  {
    id: 2,
    name: "David Lee",
    role: "Co-Founder & COO",
    image: "/images/team/david-lee.jpg",
  },
  {
    id: 3,
    name: "Jessica Mercedes",
    role: "Director of Data Systems",
    image: "/images/team/jessica-mercedes.jpg",
  },
  {
    id: 4,
    name: "Williams Christidass",
    role: "Innovation & Research Lead",
    image: "/images/team/williams-christidass.jpg",
  },
  {
    id: 5,
    name: "Ameer Barker",
    role: "Head of Strategy",
    image: "/images/team/ameer-barker.jpg",
  },
  {
    id: 6,
    name: "Elise Schwartz",
    role: "Project Manager",
    image: "/images/team/elise-schwartz.jpg",
  },
  {
    id: 7,
    name: "Rosalie Meza",
    role: "Director of Data Systems",
    image: "/images/team/rosalie-meza.jpg",
  },
  {
    id: 8,
    name: "Kalel Olsen",
    role: "Client Engagement Lead",
    image: "/images/team/kalel-olsen.jpg",
  },
];

const TalentedTeam = () => {
  return (
    <section className="bg-neutral-300 py-10 relative overflow-hidden">
      <div className="text-center">
        <h4 className="heading_b_border text-center">Our Talented Team </h4>
      </div>
      <div className="relative mt-10">
        <div className="grid grid-cols-4 gap-6">
          {teamData.map((member) => (
            <div
              key={member.id}
              className="rounded-xl overflow-hidden bg-neutral-900"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={300}
                height={300}
                className="w-full h-auto"
              />
              <div className="p-4">
                <h4>{member.name}</h4>
                <p className="text-sm text-gray-400">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TalentedTeam;
