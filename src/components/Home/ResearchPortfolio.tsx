import img1 from "@/assets/images/ResearchPortfolio/img1.png";
import img2 from "@/assets/images/ResearchPortfolio/img2.png";
import img3 from "@/assets/images/ResearchPortfolio/img3.png";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Button from "../ui/Button";
import Link from "next/link";

const researchPortfolioData = [
  {
    id: 1,
    title: "A Proven Process that Works",
    image: img1,
    description:
      "We create a detailed pre-construction plan covering scope, budget, and timeline working with architects, engineers, and clients to ensure everything is ready before construction begins.",
  },
  {
    id: 2,
    title: "Construct a Building",
    image: img2,
    description:
      "With the plan in place, our skilled crews bring it to life. We use quality materials, proven techniques, and strict safety standards to keep your project on track and built to last.",
  },
  {
    id: 3,
    title: "Provide a Solution",
    image: img3,
    description:
      "We finish strong with thorough inspections, final touches, and a complete walkthrough. You get a finished project that meets our highest standards  and yours.",
  },
];

const ResearchPortfolio = () => {
  return (
    <section className="bg-neutral-200 py-14 relative">
      <div className="container">
        <div className="grid max-md:grid-cols-1 grid-cols-2 gap-6 relative max-md:flex max-md:flex-col-reverse">
          <div className="flex flex-col gap-8">
            {researchPortfolioData.map((item) => (
              <Link href="/" key={item.id}>
                <div className="relative border-2 border-neutral-500 rounded-2xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={554}
                    height={339}
                    className="w-full h-auto"
                  />

                  <div className="absolute bottom-0 z-10 p-7">
                    <h4>{item.title}</h4>
                    <p className="font-avenirLtStd font-light leading-tight mt-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="w-full h-48 absolute bottom-0 bg-linear-to-t from-black to-transparent"></div>
                  <button className="bg-neutral-200 size-11 rounded-sm flex justify-center items-center absolute top-4 right-4 border border-neutral-500">
                    <ArrowUpRight className="text-primary" />
                  </button>
                </div>
              </Link>
            ))}
          </div>

          <div className="h-max text-end space-y-7 sticky top-55 max-md:mt-0 max-md:text-center max-md:static">
            <h4 className="heading_b_border">Research Portfolio</h4>
            <h3>
              Our research portfolio focuses on advancing technologies in
              blockchain, distributed systems, and modern data center
              infrastructure. We continuously explore innovative solutions to
              improve security, scalability, and performance for next-generation
              digital platforms.
            </h3>
          </div>
        </div>

        <div className="text-center">
          <Button
            label={
              <>
                View more
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            }
            className="mt-10 max-md:mt-6"
          />
        </div>
      </div>
    </section>
  );
};

export default ResearchPortfolio;
