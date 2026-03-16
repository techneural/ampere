import Image from "next/image";

import company1 from "@/assets/images/Trusted/1.png";
import company2 from "@/assets/images/Trusted/2.png";
import company3 from "@/assets/images/Trusted/3.png";
import company4 from "@/assets/images/Trusted/4.png";
import company5 from "@/assets/images/Trusted/5.png";
import company6 from "@/assets/images/Trusted/6.png";

const TrustedCompanies = () => {
  const companies = [
    company1,
    company2,
    company3,
    company4,
    company5,
    company6,
  ];

  const loopCompanies = [...companies, ...companies];

  return (
    <section className="bg-neutral-300 py-10 relative overflow-hidden">
      <div className=" text-center">
        <h4 className="heading_b_border text-center">
          Trusted By 250+ Companies
        </h4>
      </div>
      <div className="relative mt-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-32 bg-linear-to-r from-neutral-200 via-neutral-200/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 h-full w-32 bg-linear-to-l from-neutral-200 via-neutral-200/80 to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-scroll gap-4 w-max">
          {loopCompanies.map((logo, index) => (
            <div
              key={index}
              className="w-75 h-22.5 flex items-center justify-center bg-black rounded-smy"
            >
              <Image
                src={logo}
                alt="company logo"
                width={200}
                className="h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
