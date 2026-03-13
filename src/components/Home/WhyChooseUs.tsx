import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";

const WhyChooseUs = () => {
  return (
    <section className="py-14">
      <div className="container grid max-md:grid-cols-1 grid-cols-2 gap-6 items-center">
        <div className="space-y-8 max-lg:space-y-4 max-md:text-center">
          <h4 className="heading_b_border">Why Choose Us </h4>

          <h3>Creating reliable solutions is at the heart of our mission</h3>

          <div className="w-max max-md:mx-auto">
            <div className="bg-neutral-200 flex items-center rounded-sm w-max h-11 px-6 max-lg:px-3">
              <h3 className="md:text-lg xl:text-[1.625rem]">
                5 Public Cos | As Happy customers
              </h3>
            </div>
            <p className="xl:text-[1.313rem] text-center text-neutral-400 font-medium mt-2">
              Where we provided NRE and Deployments
            </p>
          </div>

          <Button
            label={
              <>
                Get in Touch
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            }
          />
        </div>
        <div className="max-md:w-full max-md:h-full w-full h-92">
          <video controls className="w-full h-92 object-cover rounded-lg">
            <source src="/videos/Why-Us-Video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
