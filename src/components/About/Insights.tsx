import img1 from "@/assets/images/SmarterDecisions/img1.png";
import img2 from "@/assets/images/SmarterDecisions/img2.png";

import source from "@/assets/images/SmarterDecisions/source.png";
import calender from "@/assets/images/SmarterDecisions/calender.png";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const insightsData = [
  {
    id: 1,
    title: "The Future of Solar Energy: Trends & Innovations",
    source: "Maintenance",
    date: "September 23, 2025",
    image: img1,
    href: "https://ampere-labs.design.webflow.com/blog/the-future-of-solar-energy-trends-innovations",
  },
  {
    id: 2,
    title: "The environmental impact of solar: by the numbers -",
    source: "Renewable",
    date: "September 23, 2025",
    image: img2,
    href: "https://ampere-labs.design.webflow.com/blog/the-environmental-impact-of-solar-by-the-numbers",
  },
];

const Insights = () => {
  return (
    <section className="py-14 bg-neutral-300">
      <div className="container">
        <div className="text-center max-w-203 mx-auto">
          <h4 className="heading_b_border">Insights </h4>
        </div>
      </div>

      <div className="mt-10">
        <div className="container relative flex gap-7.5 max-md:flex-col">
          {insightsData.map((item) => (
            <Link
              href={item.href}
              target="_blank"
              key={item.id}
              className="w-full md:min-h-109 max-w-full inline-block border-2 border-neutral-500 rounded-2xl hover:w-[150%] transition-[width] duration-450 ease-in-out overflow-clip cursor-pointer"
            >
              <div className="rounded-t-xl relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={602}
                  height={403}
                  className="w-full md:h-82 object-cover"
                />
                <button className="bg-neutral-200 size-11 rounded-sm flex justify-center items-center absolute bottom-4 right-4 border border-neutral-500">
                  <ArrowUpRight className="text-primary" />
                </button>
              </div>

              <div className="px-6 py-5 border-t-2 bg-neutral-200 border-neutral-500">
                <div className="font-avenirLtStd flex items-center gap-6 mb-2 text-neutral-400">
                  <div className="flex items-center">
                    <Image
                      src={source}
                      alt={item.source}
                      width={30}
                      height={30}
                    />
                    <p>{item.source}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src={calender}
                      alt="calender"
                      width={30}
                      height={30}
                    />
                    <p>{item.date}</p>
                  </div>
                </div>
                <h4 className="line-clamp-1">{item.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
