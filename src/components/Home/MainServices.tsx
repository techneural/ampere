import { ArrowRight } from "lucide-react";
import modular from "@/assets/images/MainServices/modular.png";
import airCooled from "@/assets/images/MainServices/airCooled.png";
import sustainable from "@/assets/images/MainServices/sustainable.png";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

const mainServicesData = [
  {
    id: 1,
    title: "Modular containers or centralized buildings",
    img: modular,
    description:
      "Soup-to-nuts BOM for a turnkey deployment, including - server racks, drycoolar or chiller arrays, plumbing and electrical components. Procurement services optional.",
  },
  {
    id: 2,
    title: "Air-cooled, Single-Phase, 2 Phase or Direct-to-Chip",
    img: airCooled,
    description:
      "Solutions customized to meet your desired operating conditions (TDP, weather, water availability) while prioritizing your relative needs for speed, cost, scalability, reliability.",
  },
  {
    id: 3,
    title: "Sustainable Solutions with low PUE/WUE",
    img: sustainable,
    description:
      "Our solutions can achieve a PUE<1.05, zero-water usage, heat-recapture, or anything else that you need without adding additional complexity.",
  },
];

const MainServices = () => {
  return (
    <section className="pt-14">
      <div className="container">
        <div className="text-center max-w-191.5 mx-auto space-y-8">
          <h4 className="heading_b_border">Our Main Service Areas </h4>
          <h3>
            General Contracting & Vendor Management. Ready-to-go designs for
            speedy deployments. Procurement. Customized solutions (NRE / RFP)
            for cost-effective scaling.
          </h3>
        </div>
      </div>

      <div className="bg-neutral-300 mt-14 py-14 max-xl:py-10">
        <div className="container grid grid-cols-3 gap-21 relative max-md:grid-cols-1 max-md:gap-10">
          <div className="absolute left-1/3 top-1/2 -translate-y-1/2 h-52.25 flex justify-center pointer-events-none max-md:hidden">
            <div className="absolute w-1.5 h-full bg-primary blur-xl opacity-40"></div>
            <div className="w-0.5 h-full bg-linear-to-b from-transparent via-primary to-transparent"></div>
          </div>

          <div className="absolute left-2/3 top-1/2 -translate-y-1/2 h-52.25 flex justify-center pointer-events-none max-md:hidden">
            <div className="absolute w-1.5 h-full bg-primary blur-xl opacity-40"></div>
            <div className="w-0.5 h-full bg-linear-to-b from-transparent via-primary to-transparent"></div>
          </div>

          {mainServicesData.map((item) => (
            <div key={item.id} className="flex flex-col max-md:text-center">
              <div className="flex-1">
                <div
                  className={`relative flex items-center justify-center size-15 rounded-lg bg-neutral-300 border border-neutral-800 mb-8 max-md:mx-auto`}
                >
                  <div className="w-15.5 h-15 rounded-lg absolute right-0 -left-0.5 top-0 bg-linear-to-t from-[#151515] via-neutral-200 to-transparent z-10 pointer-events-none"></div>

                  <Image
                    src={item.img}
                    alt="service-icon"
                    width={50}
                    height={50}
                    className="size-12.5 z-10"
                  />
                </div>

                <Link href="/">
                  <h3 className="max-xl:mb-3 mb-5">{item.title}</h3>
                </Link>
                <p className="font-avenirLtStd text-neutral-400">
                  {item.description}
                </p>
              </div>

              <Button
                label={
                  <>
                    Learn more
                    <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                }
                variant="ghost"
                className="max-xl:mt-6 mt-12"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainServices;
