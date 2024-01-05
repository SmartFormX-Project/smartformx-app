import { Form } from "@/types/interfaces";
import FormDescription from "./widgets/FormInfo";
import { Tab, Tabs } from "@nextui-org/react";
import InsightsDetails from "./widgets/InsightDetails";
import AnalyseAndKeyWords from "./widgets/AnalyseAndKeywords";
import StatsComponent from "./widgets/Stats";

export default function MobileHomePage({
  onOpenModalShare,
  formData,
  isAvailableSolution,
  noAnalyseComponent,
}: {
  onOpenModalShare: any;
  formData: Form;
  isAvailableSolution: boolean;
  noAnalyseComponent: any;
}) {
  const hasAnalyse = formData.Analyse != null || formData.Analyse != undefined;
  return (
    <div>
      <Tabs variant="light" className="mt-4 " color="primary">
        <Tab key="f" title="Formulário">
          <FormDescription
            formData={formData}
            onOpenModalShare={onOpenModalShare}
            isMobile
          />
        </Tab>
        <Tab key="i" title="Insights">
          {hasAnalyse ? (
            <InsightsDetails
              insights={formData.Analyse?.Topics ?? []}
              isAvailableSolution={isAvailableSolution}
              isMobile
            />
          ) : (
            <div
              className="border border-black/10 rounded-2xl h-[300px] w-full flex justify-center items-center text-black  animate-fade-up"
              style={{ animationDelay: "0.15s" }}
            >
              {noAnalyseComponent}
            </div>
          )}
        </Tab>
        {hasAnalyse && (
          <Tab key="a" title="Análise">
            <AnalyseAndKeyWords
              keywords={formData.Analyse?.keywords ?? []}
              summary={formData.Analyse?.summary ?? ""}
              isMobile
            />
          </Tab>
        )}
        {hasAnalyse && (
          <Tab key="e" title="Estatisticas">
            <StatsComponent stats={formData.Analyse?.Stats ?? []} isMobile />
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
