"use client";

import AnalyseService from "@/app/api/repository/AnalyseService";
import { Button } from "@nextui-org/button";
import { useState } from "react";

export default function GenerateInsightsButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const updateLoading = () => setLoading((prev) => !prev);

  const generateInsights = async () => {
    updateLoading();
    const res = await AnalyseService.createAnalyses(id);

    if (res.status == 201) {
      window.location.reload();
    }
    updateLoading();
  };
  return (
    <Button variant="shadow" size="lg" color="primary" isLoading={loading} onClick={generateInsights}>
      Gerar insights
    </Button>
  );
}
