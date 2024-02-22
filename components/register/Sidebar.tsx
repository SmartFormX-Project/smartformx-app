"use client";

import { go_beyond, go_beyond_outline } from "@/assets";
import Image from "next/image";
// import { go_beyond_outline } from "@/assets";
type NavTypes = {
  currentStepIndex: number;
  finished: boolean;
  gotoForm?: (index: number) => void;
};

const Sidebar = ({ currentStepIndex, finished }: NavTypes) => {
  const steps = ["Pessoal info", "Negócio"];
  return (
    <header className="h-[150px] m-auo bg-black bg-bg-mobile bg-cover bg-center md:h-auto md:rounded-xl md:bg-bg-desktop md:px-8 ">
      <div className="flex md:h-full w-full justify-center space-x-6 pt-10  md:w-[220px] md:flex-col md:justify-start md:space-x-0 md:space-y-8">
        {steps.map((btn, i) => {
          let position;
          if (i === currentStepIndex || finished) {
            position = "active";
          }

          return (
            <div className="md:flex md:items-center" key={btn}>
              <button
                className={`${position} flex h-[40px] w-[40px] items-center justify-center rounded-full border border-white text-white transition-all md:mr-5`}
              >
                {i + 1}
              </button>
              <div className="hidden md:block cursor-default">
                <p className="text-sm font-light uppercase text-light-gray">
                  passo {i + 1}
                </p>
                <p className="text-base font-medium uppercase text-white">
                  {btn}
                </p>
              </div>
            </div>
          );
        })}
        <span className="hidden md:flex md:flex-auto"></span>
        {/* <h1 className="font-semibold text-3xl">Go beyond</h1> */}
        <Image className="hidden md:block" src={go_beyond} width={130} alt="" />
        <span className="hidden md:block md:mt-4"></span>
      </div>
      <h2 className="md:hidden mt-4 text-center font-semibold text-xl">
        {steps[currentStepIndex]}
      </h2>
    </header>
  );
};

export default Sidebar;
