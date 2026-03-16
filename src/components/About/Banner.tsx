import React from "react";

const Banner = () => {
  return (
    <section className="relative min-h-[calc(100vh-71px)] bg-[url('@/assets/images/about/banner.png')] bg-no-repeat bg-cover bg-center flex items-end py-18 max-md:items-center max-md:text-center">
      <div className="container z-10">
        <h1>
          Powering scalable,
          <br className="max-md:hidden" />
          high-performance AI computing.
        </h1>
      </div>
      <div className="w-full h-[17.563rem] absolute bottom-0 bg-linear-to-t from-black to-transparent max-md:h-[37.563rem]"></div>
    </section>
  );
};

export default Banner;
