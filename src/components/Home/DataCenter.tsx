"use client";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SwiperContainer from "../ui/SwiperContainer";
import img1 from "@/assets/images/DataCenter/Single-Phase-in-a-Building.jpg";
import img2 from "@/assets/images/DataCenter/Single-Phase-at-Edge.jpg";
import img3 from "@/assets/images/DataCenter/Air-cooled-in-a-container.jpg";
import img4 from "@/assets/images/DataCenter/Air-cooled-in-building.jpg";
import img5 from "@/assets/images/DataCenter/Direct-to-chip-in-a-container.jpg";
import img6 from "@/assets/images/DataCenter/2-Phase-immersion-in-a-container-2.jpg";
import img7 from "@/assets/images/DataCenter/Air-cooled-in-building-2.jpg";
import img8 from "@/assets/images/DataCenter/Air-cooled-in-building-3.jpg";

import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";

const dataCenterData = [
  {
    id: 1,
    title: "Single Phase in a Building",
    highLights: "A 250MW datacenter in Texas",
    image: img1,
    description:
      "A hyperscale 250MW facility engineered within a single, strategically optimized structure to maximize operational efficiency and energy distribution.",
  },
  {
    id: 2,
    title: "Single Phase at Edge",
    highLights: "Modular 50KW tanks in a commercial building in Houston TX",
    image: img2,
    description:
      "Optimized for edge performance, rapid scalability, and resilient single-phase power delivery in space-constrained urban infrastructure.",
  },
  {
    id: 3,
    title: "Air-cooled in a container",
    highLights: "20MW Enterprise datacenter in Bangalore",
    image: img3,
    description:
      "A high-density, containerized 20MW facility engineered with advanced air-cooling architecture for optimal thermal efficiency and uptime.",
  },
  {
    id: 4,
    title: "Air-cooled in building",
    highLights: "50MW crypto mining datacenter in Philadelphia PA",
    image: img4,
    description:
      "A high-capacity 50MW facility engineered with precision air-cooling systems to sustain intensive crypto mining operations at peak efficiency.",
  },
  {
    id: 5,
    title: "Direct-to-chip in a container",
    highLights:
      "25MW datacenter for AI ASICs and GPUs from Etched and Sambanova",
    image: img5,
    description:
      "A high density, containerized 25MW deployment engineered with advanced direct-to-chip liquid cooling to maximize performance and thermal efficiency.",
  },
  {
    id: 6,
    title: "2-Phase immersion in a container",
    highLights: "20MW8MW Edge datacenters in Texas and UAE",
    image: img6,
    description:
      "High efficiency 8MW edge deployments leveraging advanced two phase immersion cooling to deliver exceptional thermal performance and hardware longevity.",
  },
  {
    id: 7,
    title: "Air-cooled in building",
    highLights: "250MW crypto datacenter in Marble NC",
    image: img7,
    description:
      "A hyperscale 250MW crypto facility engineered with advanced air cooling systems to sustain high density mining operations with optimal thermal balance.",
  },
  {
    id: 8,
    title: "Air-cooled in building",
    highLights: "250MW AI datacenter in Dalton GA",
    image: img8,
    description:
      "Designed for thermal efficiency, power optimization, and scalable growth within a secure, enterprise grade building infrastructure.",
  },
];

const DataCenter = () => {
  return (
    <section className="pt-14">
      <div className="container">
        <div className="text-center max-w-203 mx-auto space-y-8">
          <h4 className="heading_b_border">Our Datacenter Design Experience</h4>
          <h3>
            From power and cooling optimization to security and future-ready
            infrastructure, our designs transform mission -critical environments
            into strategic business assets.
          </h3>
        </div>
      </div>

      <div className="bg-neutral-300 mt-14 pt-8 pb-18 max-xl:py-10">
        <div className="container relative">
          <SwiperContainer
            items={dataCenterData}
            slidesPerView={2}
            space={70}
            loop
            autoplay
            showPagination
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 2 },
            }}
            renderItem={(item) => (
              <div className="border-2 border-neutral-500 p-6 rounded-2xl h-full max-md:p-3">
                <h4 className="text-neutral-600 font-normal mb-4">
                  {item.title}
                </h4>

                <Link href="/" target="_blank" className="overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={489}
                    height={314}
                    className="w-full h-78.5 max-md:h-60 rounded-xl"
                  />
                </Link>

                <Link href="/" target="_blank">
                  <h4 className="mt-4">{item.title}</h4>
                </Link>
                <div className="flex justify-between gap-3 mt-2">
                  <div className="bg-neutral-200 flex items-center rounded-sm max-lg:w-auto max-w-87.5 h-11 px-3">
                    <h6 className="text-sm line-clamp-1">{item.highLights}</h6>
                  </div>
                  <Link
                    href="/"
                    target="_blank"
                    className="bg-neutral-200 size-11 flex justify-center items-center border border-neutral-500 rounded-sm"
                  >
                    <ArrowUpRight className="text-primary" />
                  </Link>
                </div>

                <p className="font-avenirLtStd leading-tight text-neutral-400 mt-4">
                  {item.description}
                </p>
              </div>
            )}
          />

          <div className="max-md:text-center">
            <Button
              label={
                <>
                  View more
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              }
              className="md:absolute right-4 -bottom-2 z-10 max-md:mt-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataCenter;
