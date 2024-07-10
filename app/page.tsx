"use client";

import { useEffect, useState } from "react";
import Hero from "./_components/Hero";
import AccordionGroup from "./_components/AccordionGroup";

export default function Home() {
  type AcfAccordionData = {
    accordion_item_question?: string;
    accordion_item_answer?: string;
  };

  type AcfData = {
    superior_title_text: string;
    inferior_title_text: string;
    title: string;
    description_text: string;
    cta_label: string;
    accordion_title: string;
    accordion_subtitle: string;
    accordion: AcfAccordionData[];
  };

  const reqUrl =
    "https://itsmoney.mobstaging.com.br/wp-json/wp/v2/calculadoras/26056?&_fields=acf";
  const fetchData = async () => {
    try {
      const response = await fetch(reqUrl);
      if (!response.ok) {
        throw new Error(`Erro ao obter dados: ${response.statusText}`);
      }
      const data = await response.json();
      setAcfData(data.acf);
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [acfData, setAcfData] = useState<AcfData>();

  return (
    <>
      <Hero
        upperTitle={acfData?.superior_title_text}
        title={acfData?.title}
        underTitle={acfData?.inferior_title_text}
        description={acfData?.description_text}
        ctaLabel={acfData?.cta_label}
      />
      <AccordionGroup
        accordionTitle={acfData?.accordion_title}
        accordionSubtitle={acfData?.accordion_subtitle}
        items={acfData?.accordion}
      />

    </>
  );
}
