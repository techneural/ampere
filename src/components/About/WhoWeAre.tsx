"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import girl from "@/assets/images/about/WhoWeAre/girl.png";
import projectIcon from "@/assets/images/about/WhoWeAre/projectIcon.svg";
import successIcon from "@/assets/images/about/WhoWeAre/successIcon.svg";

const whoWeAreData = [
  {
    id: 1,
    image: girl,
  },
  {
    id: 2,
    image: girl,
  },
  {
    id: 3,
    image: girl,
  },
];

const statsData = [
  {
    id: 1,
    value: "1.50+",
    title: "Success Project Completed",
    description:
      "We've delivered 50+ projects that help companies generate real results.",
    icon: projectIcon,
  },
  {
    id: 2,
    value: "2.99%",
    title: "Customer Satisfaction Rate",
    description:
      "The percentage of customers who are satisfied with their service.",
    icon: successIcon,
  },
];

const WhoWeAre = () => {
  return (
    <section className="pt-14 overflow-clip">
      <div className="container flex flex-col-reverse md:grid grid-cols-3 items-center max-md:text-center">
        <div className="md:col-span-2">
          <h3 className="md:text-start">
            We build the physical backbone of AI data centers, combining
            high-performance cooling, advanced power systems, and scalable
            infrastructure to enable faster and more efficient computing.
          </h3>
        </div>
        <div className="md:col-span-1 max-md:mb-4 text-center">
          <h4 className="heading_b_border">who we are</h4>
        </div>
      </div>

      <div className="mt-10">
        <Marquee speed={50} loop={0}>
          {whoWeAreData.map((item) => (
            <div key={item.id} className="mx-2">
              <Image
                key={item.id}
                src={item.image}
                alt="Image"
                width={700}
                height={500}
                className="h-auto rounded-2xl"
              />
            </div>
          ))}
        </Marquee>
      </div>

      <div className="container grid md:grid-cols-2 gap-6 mt-16 max-md:mt-12">
        {statsData.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-xl border-2 border-neutral-500 bg-neutral-200"
          >
            <div className="flex justify-between items-center">
              <div className="size-[3.938rem] bg-primary rounded-lg flex justify-center items-center">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={48}
                  height={48}
                />
              </div>
              <h1 className="xl:text-6xl font-avenirLtStd font-normal">
                {item.value}
              </h1>
            </div>

            <h4
              className="mt-2 underline underline-offset-8 text-card-content"
              style={{
                textDecorationColor: "var(--color-primary)",
                textDecorationSkip: "none",
              }}
            >
              {item.title}
            </h4>
            <h6 className="font-avenirLtStd text-neutral-400 mt-5">
              {item.description}
            </h6>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhoWeAre;
