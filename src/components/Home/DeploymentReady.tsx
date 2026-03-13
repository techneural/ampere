"use client";

import Image from "next/image";
import SwiperContainer from "../ui/SwiperContainer";
import img1 from "@/assets/images/DeploymentReady/Pre-fab-containerized-datacenter.jpg";
import img2 from "@/assets/images/DeploymentReady/Chiller-modules-integrated-in-field.png";
import img3 from "@/assets/images/DeploymentReady/2-Phase-containerized-tank.jpg";
import img4 from "@/assets/images/DeploymentReady/2-Phase-tank-for-small-offices_combine.jpg";
import icon from "@/assets/images/DeploymentReady/icon.png";

import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import Link from "next/link";

const deploymentReadyData = [
  {
    id: 1,
    title: "Pre-fab containerized datacenter",
    image: img1,
    description:
      "Pre-fab container assembly with breaker panels and transformers",
  },
  {
    id: 2,
    title: "Chiller modules integrated in field",
    image: img2,
    description: "Pre-fab Chiller modules ready for integration in the field",
  },
  {
    id: 3,
    title: "2-Phase containerized tank",
    image: img3,
    description: "700KW containers with integrated drycoolers",
  },
  {
    id: 4,
    title: "2-Phase tank for small offices",
    image: img4,
    description: "50KW tanks with 48U server capacity",
  },
];

const DeploymentReady = () => {
  return (
    <section className="pt-14">
      <div className="container md:grid grid-cols-3 items-center max-md:text-center">
        <div className="md:col-span-1">
          <h4 className="heading_b_border">Deployment Ready Modules </h4>
        </div>
        <div className="md:col-span-2 max-md:mt-4">
          <h3 className="md:text-end">
            Accelerate time-to-market with secure, high-performance components
            designed for reliability, operational flexibility, and scalable
            infrastructure that supports long-term growth.
          </h3>
        </div>
      </div>

      <div className="bg-neutral-300 mt-14 pt-8 pb-18 max-xl:py-10">
        <div className="container relative">
          <SwiperContainer
            items={deploymentReadyData}
            slidesPerView={3}
            space={30}
            loop
            autoplay
            showPagination
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3 },
            }}
            renderItem={(item) => (
              <div className="border-2 border-neutral-500 rounded-2xl h-full overflow-hidden">
                <Link
                  href="/"
                  target="_blank"
                  className="rounded-t-xl relative"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={489}
                    height={269}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute -bottom-6 right-0 size-[3.938rem] bg-primary rounded-s-lg flex justify-center items-center">
                    <Image src={icon} alt={item.title} width={40} height={40} />
                  </div>
                </Link>

                <div className="px-6 py-8 max-md:p-4">
                  <Link href="/" target="_blank">
                    <h4 className="line-clamp-1">{item.title}</h4>
                  </Link>
                  <p className="font-avenirLtStd leading-tight text-neutral-400 mt-4">
                    {item.description}
                  </p>
                </div>
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

export default DeploymentReady;
