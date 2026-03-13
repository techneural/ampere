"use client";

import SwiperContainer from "../ui/SwiperContainer";
import img1 from "@/assets/images/HardwarePortfolio/Servers.jpg";
import img2 from "@/assets/images/HardwarePortfolio/Proprietary-Control-Boards.jpg";
import img3 from "@/assets/images/HardwarePortfolio/Transformers.jpg";
import img4 from "@/assets/images/HardwarePortfolio/Power-Distribution-Units.jpg";
import img5 from "@/assets/images/HardwarePortfolio/Cooling-Exhausts.jpg";
import img6 from "@/assets/images/HardwarePortfolio/Heat-Exchangers.jpg";
import img7 from "@/assets/images/HardwarePortfolio/Switchgear.jpg";
import img8 from "@/assets/images/HardwarePortfolio/Breaker-Panels.jpg";

import ServersIcon from "@/assets/images/HardwarePortfolio/Servers-icon.png";
import ProprietaryControlIcon from "@/assets/images/HardwarePortfolio/Proprietary-Control-icon.png";
import TransformersIcon from "@/assets/images/HardwarePortfolio/Transformers-icon.png";
import PowerDistributionUnitsIcon from "@/assets/images/HardwarePortfolio/Power-Distribution-Units-icon.png";
import CoolingExhaustsIcon from "@/assets/images/HardwarePortfolio/Cooling-Exhausts-icon.png";
import HeatExchangersIcon from "@/assets/images/HardwarePortfolio/Heat-Exchangers-icon.png";
import SwitchgearIcon from "@/assets/images/HardwarePortfolio/Switchgear-icon.png";
import BreakerPanelsIcon from "@/assets/images/HardwarePortfolio/Breaker-Panels-icon.png";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import Link from "next/link";

const customHardwarePortfolioData = [
  {
    id: 1,
    title: "Servers",
    icon: ServersIcon,
    image: img1,
    iconWidth: "size-12.5",
    description: "Single phase and Two-phase immersion servers with PSUs",
  },
  {
    id: 2,
    title: "Proprietary Control Boards",
    icon: ProprietaryControlIcon,
    image: img2,
    description: "Custom SCADA panels to replace PLCs",
  },
  {
    id: 3,
    title: "Transformers",
    icon: TransformersIcon,
    image: img3,
    iconWidth: "size-12.5",
    description: "Pad mount LV transformers - 500KW to 2MW",
  },
  {
    id: 4,
    title: "Power Distribution Units",
    icon: PowerDistributionUnitsIcon,
    image: img4,
    iconWidth: "size-12.5",
    description: "High Capacity PDUs - up to 250KW in 4ft length",
  },
  {
    id: 5,
    title: "Cooling Exhausts",
    icon: CoolingExhaustsIcon,
    image: img5,
    iconWidth: "size-12.5",
    description: "Drycoolers, Chillers and Cooling-towers from 250KW to 500KW",
  },
  {
    id: 6,
    title: "Heat-Exchangers",
    icon: HeatExchangersIcon,
    image: img6,
    iconWidth: "size-12.5",
    description: "HighCDUs and AHUs in 100KW to 250KW capacity",
  },
  {
    id: 7,
    title: "Switchgear",
    icon: SwitchgearIcon,
    image: img7,
    iconWidth: "size-12.5",
    description: "50KW to 250KW capacity",
  },
  {
    id: 8,
    title: "Breaker Panels",
    icon: BreakerPanelsIcon,
    image: img8,
    iconWidth: "size-12.5",
    description: "200KW to 1MW capacity",
  },
];

const CustomHardwarePortfolio = () => {
  return (
    <section className="pt-14">
      <div className="container flex flex-col-reverse md:grid grid-cols-3 items-center max-md:text-center">
        <div className="md:col-span-2">
          <h3 className="md:text-start">
            From edge devices to high density compute systems, our designs
            deliver optimized efficiency, reliability and seamless integration
            into modern digital ecosystems.
          </h3>
        </div>
        <div className="md:col-span-1 max-md:mb-4 text-center">
          <h4 className="heading_b_border">Our Custom Hardware Portfolio</h4>
        </div>
      </div>

      <div className="bg-neutral-300 mt-14 pt-8 pb-18 max-xl:py-10">
        <div className="container relative">
          <SwiperContainer
            items={customHardwarePortfolioData}
            slidesPerView={3}
            space={20}
            loop
            autoplay
            showPagination
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3 },
            }}
            renderItem={(item) => (
              <Link href="/" target="_blank">
                <div className="border-2 border-neutral-500 rounded-2xl h-full overflow-hidden">
                  <div className="rounded-t-xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={489}
                      height={314}
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-4 mt-5 px-4 pb-3">
                    <div
                      className={`flex items-center justify-center min-w-[3.938rem] h-[3.938rem] rounded-lg bg-neutral-300 border border-neutral-800 mb-8`}
                    >
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={30}
                        height={30}
                        className={`${item?.iconWidth}`}
                      />
                    </div>

                    <div>
                      <h4 className="line-clamp-1">{item.title}</h4>

                      <p className="font-avenirLtStd leading-tight text-neutral-400 mt-2 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
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

export default CustomHardwarePortfolio;
