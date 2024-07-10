"use client";

import * as React from "react";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ArrowRight, Check, CheckCircle2Icon, DollarSignIcon, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import parse from 'html-react-parser';
import { cn } from "../_lib/utils";
import SimulationResult from "./SimulationResult";
import { randomUUID } from "crypto";
import { SheetClose } from "./ui/sheet";
import { Separator } from "@radix-ui/react-separator";
// import { Progress, ProgressIndicator } from "@radix-ui/react-progress";
import { Progress } from "./ui/progress";
import { calculateCompoundInterest } from "../_lib/functions";


export function CardWithForm() {
  type Steps = {
    titulo_da_etapa: string;
    texto_da_etapa: string;
    questoes_da_etapa: Questions[];
  };

  type Questions = {
    questao: Question;
  };

  type Question = {
    texto_da_questao: string;
    tipo_da_questao: QuestionType;
    texto_do_placeholder?: string;
    opcoes_de_resposta?: RadioOptions[];
    opcoes_de_a_b?: AB_Options[];
    alias_do_campo?: string;
  };

  type QuestionType = "Texto" | "Número" | "A/B" | "Múltipla Escolha";

  type RadioOptions = {
    opcao_de_resposta_multipla?: string;
  };

  type AB_Options = {
    opcao_de_resposta_a_b?: string;
  };

  type StepsData = {
    etapas: Steps[];
  };


  type FormDataFields = {
    name: string;
    phone: string
    age: number,
    retire_age: number,
    initial_investment: number,
    month_investment: number,
    gender: string,
    investidor_profile: string,
  }

  const [acfEtapas, setAcfEtapas] = useState<StepsData>();

  const reqUrl =
    "https://itsmoney.mobstaging.com.br/wp-json/wp/v2/calculadoras/26056?&_fields=acf.etapas";

  const fetchData = async () => {
    try {
      const response = await fetch(reqUrl);
      if (!response.ok) {
        throw new Error(`Erro ao obter dados: ${response.statusText}`);
      }
      const data = await response.json();

      setAcfEtapas(data.acf);
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const steps = acfEtapas?.etapas ?? [];

  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [clientName, setClientName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);


  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === 'opcaoSelecionada') {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
      if (name === 'name') {
        setClientName(value)
      }
    }

    if (event.target.value.length) {
      return setIsEmpty(false)
    } else {
      return setIsEmpty(true)
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitted(true);
    const retireAge = Number(formData.retire_age)
    const userAge = Number(formData.age)
    const monthlyInvestiment = Number(formData.monthly_investment)
    const initialInvestiment = Number(formData.initial_investment)

    const interestRate = 0.33
    const timePeriod = retireAge - userAge;

    const amountDeposited = Number((monthlyInvestiment * timePeriod * 12) + initialInvestiment).toFixed(2)

    const totalEarned = Number(calculateCompoundInterest(initialInvestiment, interestRate, timePeriod)).toFixed(2)


    const simulationData = { ...formData, totalEarned, amountDeposited }

    let storedData = JSON.parse(window.sessionStorage.getItem('Simulações') || '[]');
    storedData.push({ randomUUID, simulationData });
    window.sessionStorage.setItem('Simulações', JSON.stringify(storedData));

    alert(JSON.stringify(simulationData, null, 4))
  };



  return (
    <>
      {isSubmitted ? (
        <div className="">
          <SimulationResult />
          <Separator className="bg-[#00E5E5;] h-[1px]" />
          <SheetClose asChild>
            <div className="flex justify-between items-center bg-white  px-5 py-12">
              <div className="">
                <p className="text[17px] leading-7 text-[#000]">Deseja sair do simulador?</p>
              </div>
              <div className="bottom-4 right-4 flex items-center gap-1 rounded border border-highlight px-4 py-[9px] shadow-cst2 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary">
                <span className="text-sm font-bold text-[#000]">Sair</span>
                <LogOut className="z-10 h-4 w-4 tex" />
              </div>
            </div>
          </SheetClose>
        </div>
      ) :
        (
          <>
            <div className="flex items-center border-b-[1px] p-4 bg-white bxd-header">
              <CheckCircle2Icon
                className="mr-4 text-highlight"
                size="icon"
                width={32}
                height={32}
              />
              {/* <progress className="progress progress-accent w-full" value={formStep + 1} max={steps.length + 1}></progress> */}
              <Progress value={(formStep + 1) * 15} max={(steps.length + 1)} />

              <DollarSignIcon
                className={cn("ml-4 rounded-[100%] border-[2px] text-[#E5E5E7]", {
                  'text-highlight': formStep === steps.length
                })}
                size="icon"
                width={32}
              />

            </div>
            <Card className=" shadow-cst3 mb-10 flex w-full flex-col overflow-hidden" >
              {
                steps.map((step, index: number) => (
                  <CardContent className={
                    cn({
                      'hidden': formStep !== index,
                    })}>
                    <CardHeader>
                      <CardTitle className="font-bold dddd">{step.titulo_da_etapa}
                        {index === 1 && `${' '} ${clientName}`}
                      </CardTitle>
                      <CardDescription>
                        {parse(step.texto_da_etapa)}
                      </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                      <div className="grid w-full items-center gap-4 "
                      >
                        {step.questoes_da_etapa.map((question) => {
                          switch (question.questao.tipo_da_questao) {
                            case "Texto":
                              return (
                                <div
                                  className="flex flex-wrap items-center gap-[8px]"
                                  key={question.questao.texto_da_questao}
                                >
                                  <Label htmlFor={question.questao.texto_da_questao}>
                                    {question.questao.texto_da_questao}
                                  </Label>
                                  <Input
                                    className="mb-1 border-[1px] border-highlight bg-transparent placeholder:p-1 placeholder:text-[17px] placeholder:font-bold placeholder:text-[#C2C2C8] focus-visible:ring-[#0cc]"
                                    id={question.questao.texto_da_questao}
                                    placeholder={question.questao.texto_do_placeholder}
                                    onChange={handleChange}
                                    name={question.questao.alias_do_campo}
                                  />

                                </div>
                              );
                            case "Número":
                              return (
                                <div
                                  className="flex flex-wrap items-center gap-[8px]"
                                  key={question.questao.texto_da_questao}
                                >
                                  <Label htmlFor={question.questao.texto_da_questao}>
                                    {question.questao.texto_da_questao}
                                  </Label>
                                  <Input
                                    className="border-[1px] border-highlight bg-transparent placeholder:p-1 placeholder:text-[17px] placeholder:font-bold placeholder:text-[#C2C2C8] focus-visible:ring-[#0cc]"
                                    id={question.questao.texto_da_questao}
                                    placeholder={question.questao.texto_do_placeholder}
                                    onChange={handleChange}
                                    name={question.questao.alias_do_campo}

                                  />
                                </div>
                              );
                            case "Múltipla Escolha":
                              return (
                                <div
                                  className="flex flex-col"
                                  key={question.questao.texto_da_questao}
                                >
                                  <RadioGroup className="space-y-2" name={question.questao.alias_do_campo} onChange={handleChange}>
                                    {question.questao.opcoes_de_resposta?.map(
                                      (radio_item, index) => (
                                        <div className="radio-item flex items-center gap-4 space-x-2 rounded-sm border bg-white px-4 py-5" key={question.questao.texto_da_questao}>
                                          <RadioGroupItem
                                            value={
                                              radio_item.opcao_de_resposta_multipla as string
                                            }
                                            id={`r-ms-${index}`}
                                          />
                                          <Label
                                            htmlFor={`r-ms-${index}`}
                                            className="max-w-[84%] text-[15px] leading-6"
                                          >
                                            {radio_item.opcao_de_resposta_multipla}
                                          </Label>
                                        </div>
                                      )
                                    )}
                                  </RadioGroup>
                                </div>
                              );
                            case "A/B":
                              return (
                                <div
                                  className="flex items-center gap-2"
                                  key={question.questao.texto_da_questao}
                                >
                                  <Label htmlFor={`r-ab-${index}`}>
                                    {question.questao.texto_da_questao}
                                  </Label>
                                  <RadioGroup className="flex gap-0" name={question.questao.alias_do_campo} onChange={handleChange}>
                                    {question.questao.opcoes_de_a_b?.map(
                                      (ab_item, index) => (
                                        <div
                                          className="ab-item flex items-center gap-0 rounded-sm px-2 py-5"
                                          key={index}
                                        >
                                          <RadioGroupItem
                                            value={
                                              ab_item.opcao_de_resposta_a_b as string
                                            }
                                            id={`r-ab-${index}`}
                                            className="hidden"
                                          />
                                          <Label
                                            htmlFor={`r-ab-${index}`}
                                            className="max-w-[100%] rounded p-0 text-[15px] font-bold leading-6 text-[#c2c2c2]"
                                          >
                                            {ab_item.opcao_de_resposta_a_b}
                                          </Label>
                                        </div>
                                      )
                                    )}
                                  </RadioGroup>
                                </div>
                              );
                          }
                        })}
                      </div>

                      <Button className={cn("h-[56px] w-full max-w-[326px] bg-highlight text-base font-bold text-black absolute bottom-10", {
                        'hidden': index == (steps.length - 1),
                        // 'hidden': isEmpty == true,
                      })} type="button" onClick={() => {
                        setFormStep(formStep + 1);
                        // setIsEmpty(true)
                      }}>
                        Ok
                        <Check width={24} height={24} className="ml-1.5" />
                      </Button>
                      <Button className={cn("h-[56px] w-full bg-highlight text-base font-bold text-black mt-[34px]", {
                        'hidden': index !== (steps.length - 1),
                      })} type="submit"
                      // {...(index !== (steps.length - 1) && { disabled: true })}
                      >
                        Entrar
                        <ArrowRight width={24} height={24} className="ml-1.5" />
                      </Button>

                    </form>

                  </CardContent>

                ))
              }
            </Card >
          </>
        )
      }
    </>



  );
}
export default CardWithForm;
