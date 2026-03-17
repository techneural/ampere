import Image from "next/image";
import ourMission from "@/assets/images/About/our-mission.png";

const OurMission = () => {
  return (
    <section className="py-14 flex items-center">
      <div className="container grid max-md:grid-cols-1 grid-cols-2 gap-10 max-md:gap-8">
        <div className="flex max-md:text-center">
          <div className="space-y-3">
            <h4 className="heading_b_border">Our Mission </h4>
            <div className="bg-neutral-200 flex items-center rounded-sm max-w-max h-11 px-3 max-md:mx-auto">
              <h6 className="text-sm">
                Acceoerating high-performance and sustainable AI
              </h6>
            </div>
            <h3 className="text-justify">
              We design and engineer the physical infrastructure powering AI
              data centers from high-density cooling systems to advanced power
              systems enabling faster, greener, and more resilient computing.
            </h3>
          </div>
        </div>
        <div>
          <div className="max-lg:mx-auto border-2 border-neutral-500 border-dotted rounded-xl overflow-hidden">
            <Image
              src={ourMission}
              alt="high performance"
              width={536}
              height={460}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
