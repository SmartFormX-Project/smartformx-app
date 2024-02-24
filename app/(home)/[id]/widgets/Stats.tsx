import { Tooltip } from "@nextui-org/react";
import { FiInfo, FiLock } from "react-icons/fi";

export default function StatsComponent({
  stats,
  isMobile = false,
  isBlocked = false,
}: {
  stats: any[];
  isMobile?: boolean;
  isBlocked?: boolean;
}) {
  return isBlocked ? (
    <div className="flex flex-col justify-center overflow-hidden py-4 w-full">
      <div className="inset-0 bg-center"></div>
      <div className="text-black flex flex-col items-center py-6 relative bg-white/30 shadow-sm ring-1 ring-gray-900/5 rounded-xl backdrop-blur-lg mx-auto w-full text-center">
       <FiLock size={40}/>
        <h1 className="text-2xl mt-2 font-bold">Estatisticas</h1>
        <p className="">
          Obtenha estatisticas valiosas sobre seus clientes. <b>Assine agora!</b>
        </p>
      </div>
    </div>
  ) : (
    <div className="md:flex md:h-1/4 md:gap-4 space-y-4 md:space-y-0">
      {stats.map((e, i) => {
        return isMobile ? (
          <MobileCard key={"m-" + i} e={e} i={i} />
        ) : (
          <DesktopCard key={i} e={e} i={i} />
        );
      })}
    </div>
  );
}
const DesktopCard = ({ e, i }: { e: any; i: number }) => {
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
const MobileCard = ({ e, i }: { e: any; i: number }) => {
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
