import { FiKey } from "react-icons/fi";
import { TbChartDots3 } from "react-icons/tb";

export default function AnalyseAndKeyWords({
  keywords,
  summary,
  isMobile = false,
}: {
  keywords: string[];
  summary: string;
  isMobile?: boolean;
}) {
  return (
    <div className={`${isMobile ? "w-full": "w-1/2"}  max-h-[500px] text-black p-4 flex flex-col animate-fade-up`}>
      <div className="flex space-x-4 mb-4 items-center">
        <div className="bg-[#7928CA] text-white flex items-center justify-center rounded-lg h-10 w-10 text-xl">
          <TbChartDots3 />
        </div>
        <h1 className="font-medium text-xl text-[#7928CA]">
          Análise estratégica
        </h1>
      </div>
      <p className="text-black/50 text-xs font-light">{summary}</p>

      <div className="flex space-x-4 mb-4 mt-6 items-center">
        <div className="bg-[#7928CA] text-white flex items-center justify-center rounded-lg h-10 w-10 text-xl">
          <FiKey />
        </div>
        <h1 className="font-medium text-xl text-[#7928CA]">Palavras chave</h1>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {keywords.map((e, i) => {
          return (
            <div
              className="px-4 py-1 font-normal text-sm bg-purple-700 text-white  rounded-full"
              key={i}
            >
              {e}
            </div>
          );
        })}
      </div>
    </div>
  );
}
