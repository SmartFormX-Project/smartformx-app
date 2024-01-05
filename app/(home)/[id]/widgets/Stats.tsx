import { Tooltip } from "@nextui-org/react";
import { FiInfo } from "react-icons/fi";

export default function StatsComponent({
  stats,
  isMobile = false,
}: {
  stats: any[];
  isMobile?: boolean;
}) {
  return (
    <div className="md:flex md:h-1/4 md:gap-4 space-y-4 md:space-y-0">
      {stats.map((e, i) => {
        return isMobile ? (
          <MobileCard key={"m-"+i} e={e} i={i} />
        ) : (
          <DesktopCard key={i} e={e} i={i} />
        );
      })}
    </div>
  );
}

const DesktopCard = ({e, i}:{e: any, i: number}) => {
  return (
    <div
      key={e.id}
      className={` w-1/4 border border-blue-400 text-black h-full rounded-2xl p-4 flex flex-col justify-between animate-fade-up`}
      style={{ animationDelay: `0.${15 * i}s` }}
    >
      <span className="uppercase text-[10px]">{e.title}</span>
      <div className="flex items-center">
        <h1 className="text-2xl font-bold mr-2">{e.value}</h1>
        <Tooltip
          classNames={{}}
          showArrow={true}
          content={e.info}
          color="default"
          closeDelay={0}
        >
          <button>
            <FiInfo className="text-black/30 hover:text-black transition-colors" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
const MobileCard = ({e, i}:{e: any, i: number}) => {
  return (
    <div
    //   key={e.id}
      className={`border border-blue-400 text-black h-full rounded-2xl p-4 flex flex-col justify-between animate-fade-up`}
      style={{ animationDelay: `0.${15 * i}s` }}
    >
      <span className="uppercase font-semibold text-[12px]">{e.title}</span>
      <div className="flex items-center space-x-2">
      <span className="text-[12px] mt-2">{e.info}</span>
        <h1 className="text-2xl font-bold mr-2">{e.value}</h1>
   
      </div>
    </div>
  );
};
