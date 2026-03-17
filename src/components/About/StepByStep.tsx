import React from "react";

const workflowData = [
  {
    id: 1,
    title: "Site Assessment",
    description:
      "Optimizing Solar Energy Through Smart System Design From Site Assessment to Performance Modeling, Every Detail Matters",
  },
  {
    id: 2,
    title: "System Design",
    description:
      "Optimizing Solar Energy Through Smart System Design From Site Assessment to Performance Modeling, Every Detail Matters",
  },
  {
    id: 3,
    title: "Panel Installation",
    description:
      "Optimizing Solar Energy Through Smart System Design From Site Assessment to Performance Modeling, Every Detail Matters",
  },
  {
    id: 4,
    title: "Energy Optimization",
    description:
      "Optimizing Solar Energy Through Smart System Design From Site Assessment to Performance Modeling, Every Detail Matters",
  },
];

const StepByStep = () => {
  return (
    <section className="relative py-20">
      <div className="container grid md:grid-cols-2 gap-12 items-center max-md:gap-6">
        {/* Left Content */}
        <div>
          <h4 className="heading_b_border"> Step-by-Step Workflow</h4>
          <h3 className="md:text-start mt-10">
            Streamlined Work Process That Drives Results Efficient, Transparent,
            and Tailored for Your Success.
          </h3>
        </div>

        <div className="md:max-h-118 overflow-y-auto workflow_scroll pr-3 space-y-6 max-md:pr-0 max-md:space-y-4">
          {workflowData.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-neutral-800 border-2 border-neutral-500 rounded-xl p-5"
            >
              {/* Number */}
              <div className="min-w-10 h-10 flex items-center justify-center rounded-md border-2 border-neutral-500 text-orange-500 bg-neutral-200">
                <h3 className="font-avenirLtStd font-extrabold">{item.id}</h3>
              </div>

              {/* Text */}
              <div>
                <h4 className="text-card-content">{item.title}</h4>
                <p className="font-avenirLtStd text-neutral-400 mt-2 leading-tight">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepByStep;
