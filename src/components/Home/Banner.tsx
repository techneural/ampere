import React from "react";
import Button from "../ui/Button";

const Banner = () => {
  return (
    <section className="min-h-[calc(100vh-71px)] flex items-center relative z-10">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/videos/Banner-Video.mp4" type="video/mp4" />
      </video>

      <div className="container text-center z-10">
        <div className="max-w-137.5 mx-auto relative">
          <div className="absolute inset-0 -z-10 blur-3xl bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0)_90%)]"></div>
          <h1>Rapid Prototyping & Deployable Design</h1>
          <h2 className="font-avenirLtStd mt-2">$10bn Deployed Projects</h2>

          <Button
            label="Get Started"
            variant="primary"
            size="md"
            className="max-md:hidden mt-6"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
