"use client";

import * as React from "react";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { registerSchema } from "../validator/auth";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "../validator/auth";
import { convertToLowerCamelCase } from "../_lib/functions";


type Input = z.infer<typeof registerSchema>

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
  };

  type QuestionType = "string" | "number" | "A/B" | "Múltipla Escolha";

  type RadioOptions = {
    opcao_de_resposta_multipla?: string;
  };

  type AB_Options = {
    opcao_de_resposta_a_b?: string;
  };

  type StepsData = {
    etapas: Steps[];
  };

  const [acfEtapas, setAcfEtapas] = useState<StepsData>();

  const [formStep, setFormStep] = useState(0);


  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  })

  function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values)
  }

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
  const questionFields = []

  const bd = () => {
    steps.map((item) => {
      item.questoes_da_etapa.forEach(
        item => console.log(convertToLowerCamelCase(item.questao.texto_da_questao)))
    })
  }

  bd();

  // const questionFields = [
  //   {
  //     name: "foo",
  //     fieldType: z.string(),
  //   },
  // ]

  // const registerNewSchema = z.object(
  //   Object.fromEntries(
  //     questionFields.map((field) => [field.name, field.fieldType])
  //   )
  // )

  return (

    <Card className="shadow-cst3 mb-10 flex w-full flex-col" >
      {
        steps.map((step, index) => (
          <CardContent>
            <CardHeader>
              <CardTitle className="font-bold">{step.titulo_da_etapa}</CardTitle>
              <CardDescription>{step.texto_da_etapa}</CardDescription>
            </CardHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                  {step.questoes_da_etapa.map((question) => {
                    switch (question.questao.tipo_da_questao) {
                      case "string":
                        return (
                          <div
                            className="flex flex-wrap items-center gap-[8px]"
                            key={question.questao.texto_da_questao}
                          >
                            <FormField
                              control={form.control}
                              name='name'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor={question.questao.texto_da_questao}> {question.questao.texto_da_questao}</FormLabel>
                                  <FormControl>
                                    <Input placeholder={question.questao.texto_do_placeholder} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        );
                      case "number":
                        return (
                          <div
                            className="flex flex-wrap items-center gap-[8px]"
                            key={question.questao.texto_da_questao}
                          >
                            <FormField
                              control={form.control}
                              name='age'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor={question.questao.texto_da_questao}> {question.questao.texto_da_questao}</FormLabel>
                                  <FormControl>
                                    <Input placeholder={question.questao.texto_do_placeholder} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        );
                      case "A/B":
                        return (
                          <div
                            className="flex items-center gap-2"
                            key={question.questao.texto_da_questao}
                          >
                            <FormField
                              control={form.control}
                              name="gender"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor={question.questao.texto_da_questao}> {question.questao.texto_da_questao}</FormLabel>
                                  <FormControl>
                                    {/* <Input placeholder={question.questao.texto_do_placeholder} {...field} /> */}
                                    <RadioGroup className="flex gap-0" onValueChange={field.onChange}
                                      defaultValue={field.value}>
                                      {question.questao.opcoes_de_a_b?.map(
                                        (ab_item, index) => (
                                          <div
                                            className="ab-item flex items-center gap-0 rounded-sm px-2 py-5"
                                            key={index}
                                          >
                                            <FormItem>
                                              <FormControl>
                                                <RadioGroupItem value={ab_item.opcao_de_resposta_a_b as string} id={`ab-${index}`}
                                                  className="hidden" />
                                              </FormControl>
                                              <FormLabel htmlFor={`ab-${index}`}
                                                className="max-w-[100%] rounded p-0 text-[15px] font-bold leading-6 text-[#c2c2c2]">
                                                {ab_item.opcao_de_resposta_a_b}
                                              </FormLabel>
                                            </FormItem>
                                          </div>
                                        )
                                      )}
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                          </div>
                        );
                      case "Múltipla Escolha":
                        return (
                          <div
                            className="flex flex-col"
                            key={question.questao.texto_da_questao}
                          >
                            <FormField
                              control={form.control}
                              name="investidor_profile"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor={question.questao.texto_da_questao}> {question.questao.texto_da_questao}</FormLabel>
                                  <FormControl>
                                    <RadioGroup className="space-y-2" onValueChange={field.onChange}
                                      defaultValue={field.value}>
                                      {question.questao.opcoes_de_resposta?.map(
                                        (radio_item, index) => (
                                          <div className="radio-item flex items-center gap-4 space-x-2 rounded-sm border bg-white px-4 py-5">
                                            <FormItem  >
                                              <FormControl  >
                                                <RadioGroupItem
                                                  value={
                                                    radio_item.opcao_de_resposta_multipla as string
                                                  }
                                                />
                                              </FormControl>
                                              <FormLabel
                                                className="max-w-[84%] text-[15px] leading-6"
                                              >
                                                {radio_item.opcao_de_resposta_multipla}
                                              </FormLabel>
                                            </FormItem>
                                          </div>
                                        )
                                      )}
                                    </RadioGroup>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        );
                    }
                  })}
                </div>
              </form >
            </Form >
          </CardContent >

        ))
      }
      < CardFooter className="flex w-full items-center justify-between pt-[34px]" >
        <Button className="h-[56px] w-full bg-highlight text-base font-bold text-black">
          Ok
          <Check width={18} height={18} className="ml-1.5" />
        </Button>
      </CardFooter >
    </Card >

  );
}
export default CardWithForm;
