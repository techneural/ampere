import Image from "next/image";
import ameerBarker from "@/assets/images/about/TalentedTeam/ameer-barker.png";
import davidLee from "@/assets/images/about/TalentedTeam/david-lee.png";
import eliseSchwartz from "@/assets/images/about/TalentedTeam/elise-schwartz.png";
import jamesAnderson from "@/assets/images/about/TalentedTeam/james-anderson.png";
import jessicaMercedes from "@/assets/images/about/TalentedTeam/jessica-mercedes.png";
import kalelOlsen from "@/assets/images/about/TalentedTeam/kalel-olsen.png";
import rosalieMeza from "@/assets/images/about/TalentedTeam/rosalie-meza.png";
import williamsChristidass from "@/assets/images/about/TalentedTeam/williams-christidass.png";

const teamData = [
  {
    id: 1,
    name: "James Anderson",
    role: "CEO & Co-Founder",
    image: jamesAnderson,
  },
  {
    id: 2,
    name: "David Lee",
    role: "Co-Founder & COO",
    image: davidLee,
  },
  {
    id: 3,
    name: "Jessica Mercedes",
    role: "Director of Data Systems",
    image: jessicaMercedes,
  },
  {
    id: 4,
    name: "Williams Christidass",
    role: "Innovation & Research Lead",
    image: williamsChristidass,
  },
  {
    id: 5,
    name: "Ameer Barker",
    role: "Head of Strategy",
    image: ameerBarker,
  },
  {
    id: 6,
    name: "Elise Schwartz",
    role: "Project Manager",
    image: eliseSchwartz,
  },
  {
    id: 7,
    name: "Rosalie Meza",
    role: "Director of Data Systems",
    image: rosalieMeza,
  },
  {
    id: 8,
    name: "Kalel Olsen",
    role: "Client Engagement Lead",
    image: kalelOlsen,
  },
];

const TalentedTeam = () => {
  return (
    <section className="bg-neutral-300 py-10 relative overflow-hidden">
      <div className="container">
        <div className="text-center">
          <h4 className="heading_b_border text-center">Our Talented Team </h4>
        </div>
        <div className="relative mt-10">
          <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
            {teamData.map((member) => (
              <div
                key={member.id}
                className="rounded-t-lg overflow-hidden bg-neutral-900"
              >
                <div className="relative h-72 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="rounded-b-lg bg-neutral-200 px-4 py-3 border-x-2 border-b-2 border-neutral-500">
                  <h4 className="text-card-content">{member.name}</h4>
                  <p className="font-avenirLtStd text-neutral-400">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalentedTeam;
