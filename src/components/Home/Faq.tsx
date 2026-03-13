"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

const faqData = [
  {
    id: "01",
    question: "How long does it take to install solar panels?",
    answer:
      "We provide a wide range of green energy solutions, including solar panel installation, maintenance, and energy efficiency consultations tailored to your needs.",
  },
  {
    id: "02",
    question: "What services do you offer for businesses?",
    answer:
      "We provide a wide range of green energy solutions, including solar panel installation, maintenance, and energy efficiency consultations tailored to your needs.",
  },
  {
    id: "03",
    question: "Do you offer warranties on your products?",
    answer:
      "We provide a wide range of green energy solutions, including solar panel installation, maintenance, and energy efficiency consultations tailored to your needs.",
  },
  {
    id: "04",
    question: "Can small businesses benefit from your services?",
    answer:
      "We provide a wide range of green energy solutions, including solar panel installation, maintenance, and energy efficiency consultations tailored to your needs.",
  },
  {
    id: "05",
    question: "What kind of maintenance required for solar systems?",
    answer:
      "We provide a wide range of green energy solutions, including solar panel installation, maintenance, and energy efficiency consultations tailored to your needs.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const leftFaq = faqData.slice(0, 3);
  const rightFaq = faqData.slice(3);

  return (
    <section className="pt-14">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <h4 className="heading_b_border">
            Here are some frequently asked questions
          </h4>

          <h3>
            Better Energy Starts Here that is Powered by Advanced Solar
            Materials and with it’s Modern Tech
          </h3>
        </div>
      </div>
      <div className="bg-neutral-300 mt-14 py-10">
        <div className="container grid md:grid-cols-2">
          <div className="space-y-4">
            {leftFaq.map((faq, index) => {
              const realIndex = index;
              const open = openIndex === realIndex;

              return (
                <div
                  key={faq.id}
                  className="border-b border-neutral-800 pb-8 md:pr-10"
                >
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggle(realIndex)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`relative flex items-center justify-center size-15 rounded-lg bg-neutral-300 border border-neutral-800 `}
                      >
                        <div className="w-15.5 h-15 rounded-lg absolute right-0 -left-0.5 top-0 bg-linear-to-t from-[#151515] via-neutral-200 to-transparent z-10 pointer-events-none"></div>

                        <h4
                          className={`${open ? "text-primary" : "text-white"} transition-colors duration-300 z-10`}
                        >
                          {faq.id}
                        </h4>
                      </div>
                      <h4
                        className={`${open ? "text-primary" : "text-white"} transition-colors duration-300`}
                      >
                        {faq.question}
                      </h4>
                    </div>

                    {open ? (
                      <X
                        size={18}
                        className="text-primary transition-transform duration-300 rotate-180"
                      />
                    ) : (
                      <Plus size={18} />
                    )}
                  </div>

                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      open
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden flex">
                      <div
                        className={`relative flex items-center justify-center min-w-20 h-15 rounded-lg`}
                      />
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 max-md:mt-6">
            {rightFaq.map((faq, index) => {
              const realIndex = index + 3;
              const open = openIndex === realIndex;

              return (
                <div key={faq.id} className="border-b border-neutral-800 pb-8">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggle(realIndex)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`relative flex items-center justify-center size-15 rounded-lg bg-neutral-300 border border-neutral-800 `}
                      >
                        <div className="w-15.5 h-15 rounded-lg absolute right-0 -left-0.5 top-0 bg-linear-to-t from-[#151515] via-neutral-200 to-transparent z-10 pointer-events-none"></div>

                        <h4
                          className={`${open ? "text-primary" : "text-white"} transition-colors duration-300 z-10`}
                        >
                          {faq.id}
                        </h4>
                      </div>

                      <h4
                        className={`${open ? "text-primary" : "text-white"} transition-colors duration-300`}
                      >
                        {faq.question}
                      </h4>
                    </div>

                    {open ? (
                      <X
                        size={18}
                        className="text-primary transition-transform duration-300 rotate-180"
                      />
                    ) : (
                      <Plus size={18} />
                    )}
                  </div>
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      open
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden flex">
                      <div
                        className={`relative flex items-center justify-center min-w-20 h-15 rounded-lg`}
                      />
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
