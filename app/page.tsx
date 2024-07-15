"use client";

import { useContext, useEffect, useState } from "react";
import Hero from "./_components/Hero";
import AccordionGroup from "./_components/AccordionGroup";
import { AcfFieldsContext } from "./context/AcfFields";
import { AcfFields } from "./_types";



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

  const reqUrl = "https://imoney.mobstaging.com.br/wp-json/wp/v2/calculadoras/26056?&_fields=acf";

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

  // const [acfData, setAcfData] = useState<AcfData>();
  const [acfData, setAcfData] = useState<AcfFields>();

  return (
    <>
      <AcfFieldsContext.Provider value={acfData} >
        <Hero />
        <AccordionGroup />
      </AcfFieldsContext.Provider>
    </>
  );
}
