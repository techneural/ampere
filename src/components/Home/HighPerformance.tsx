import Image from "next/image";
import highPerformance from "@/assets/images/highPerformance.png";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";

const HighPerformance = () => {
  return (
    <section className="min-h-[33.688rem] py-14 flex items-center">
      <div className="container grid max-lg:grid-cols-1 grid-cols-2 gap-8">
        <div className="max-lg:mx-auto border-2 border-neutral-500 border-dotted rounded-xl overflow-hidden">
          <Image
            src={highPerformance}
            alt="high performance"
            width={536}
            height={460}
            className="w-full"
          />
        </div>

        <div className="flex items-center max-lg:text-center text-end">
          <div className="space-y-8">
            <h4 className="heading_b_border">
              Acceoerating high-performance and sustainable AI
            </h4>
            <h3 className="leading-tight">
              We design and engineer the physical infrastructure powering AI
              data centers from high-density cooling systems to advanced power
              systems enabling faster, greener, and more resilient computing.
            </h3>

            <Button
              label={
                <>
                  View more
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighPerformance;
