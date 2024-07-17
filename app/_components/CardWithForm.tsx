"use client";

import * as React from "react";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ArrowRight, Check, CheckCircle2Icon, DollarSignIcon, LogOut } from "lucide-react";
import { useContext, useState } from "react";
import parse from 'html-react-parser';
import { cn } from "../_lib/utils";
import SimulationResult from "./SimulationResult";
import { SheetClose } from "./ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { Progress } from "./ui/progress";
import { AcfFieldsContext } from "../context/AcfFields";
import { registerSchema } from "../validator/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { motion } from "framer-motion";
import { formatNumber, formatPhone, formatToNumber, formatToReais } from "../_lib/functions"

type Input = z.infer<typeof registerSchema>

export function CardWithForm() {
  const [formStep, setFormStep] = useState(0);

  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [clientName, setClientName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: "",
      retire_age: "",
      month_investment: "",
      initial_investment: "",
      gender: "",
      investidor_profile: "",
    },
  })

  const AcfData = useContext(AcfFieldsContext);
  const steps = AcfData?.etapas ?? [];

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    // setFormData({ ...formData, [name]: value });

    if (name === '') {
      setFormData({ ...formData, ["investidor_profile"]: value });
    } else {
      setFormData({ ...formData, [name]: value });
      if (name === 'name') {
        setClientName(value)
      }
    }

  };

  const onSubmit = (data: Input, e: any) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormStep((Number(AcfData?.etapas?.length)))

    const userAge = Number(formData.age)
    const userRetireAge = Number(formData.retire_age);
    const userPv = formatToNumber(String(formData.initial_investment));
    const userPmt = formatToNumber(String(formData.month_investment));

    const rateA = 0.00678
    const rateB = 0.0033
    const period = (userRetireAge - userAge) * 12
    const ageLimit = 100


    const ValorPrevidencia =
      (parseFloat(userPv) * Math.pow((1 + rateA), period)) +
      (parseFloat(userPmt) * (Math.pow((1 + rateA), period) - 1) / rateA)



    const ValorPoupanca =
      (parseFloat(userPv) * Math.pow((1 + rateB), period)) +
      (parseFloat(userPmt) * (Math.pow((1 + rateB), period) - 1) / rateB)

    const SalarioPrevidencia = (ValorPrevidencia * rateA) / (1 - Math.pow((1 + rateA), -(ageLimit - userRetireAge)))
    const SalarioPoupanca = (ValorPoupanca * rateB) / (1 - Math.pow((1 + rateB), -(ageLimit - userRetireAge)))

    const ValorAcumulado = parseFloat(userPv) + (parseFloat(userPmt) * period)

    const simulationData = { ...formData, ValorPoupanca, ValorPrevidencia, SalarioPrevidencia, SalarioPoupanca, ValorAcumulado }

    let storedData = JSON.parse(window.sessionStorage.getItem('Simulações') || '[]');
    storedData.push({ simulationData });
    window.sessionStorage.setItem('Simulações', JSON.stringify(storedData));
    window.sessionStorage.setItem('Idade', JSON.stringify(userAge));
  }

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
              <div className="bottom-4 right-4 flex items-center gap-1 rounded border border-highlight px-4 py-[9px] shadow-cst2 transition-opacity ct  focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary  hover:bg-highlight hover:shadow-lg cursor-pointer" >
                <span className="text-sm font-bold text-[#000]  ">Sair</span>
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
              <Progress value={(formStep + 1) * 15} max={(Number(AcfData?.etapas?.length))} />
              <DollarSignIcon
                className={cn("ml-4 rounded-[100%] border-[2px] text-[#E5E5E7]", {
                  'text-highlight': formStep >= 5,
                  'border-highlight': formStep >= 5,
                })}
                size="icon"
                width={32}
              />

            </div>

            <Card className=" shadow-cst3 mb-10 flex w-full flex-col overflow-hidden" >
              <CardHeader className="p-0 m-0 h-0">
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <div>
                <CardContent className="overflow-hidden">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                      <div className="pt-10 relative overflow-hidden h-[66vh]">

                        {/* Nome */}
                        <motion.div className={
                          cn(" flex flex-col gap-12 px-1 overflow-auto", {
                            // 'hidden': formStep != 0,
                          })}
                          animate={{
                            translateX: `-${formStep * 100}%`,
                          }}
                          transition={{
                            ease: "easeInOut"
                          }}
                        >
                          <div className="space-y-6">
                            <h2 className="text-2xl font-bold">
                              {parse(steps[0].titulo_da_etapa)}
                            </h2>
                            <h2 className="text-[17px]">
                              {parse(steps[0].texto_da_etapa)}
                            </h2>
                          </div>
                          <div className="py-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem onChange={handleChange}>
                                  <FormLabel className="text-[17px] leading-7">{steps[0].questoes_da_etapa[0].questao.texto_da_questao}</FormLabel>
                                  <FormControl>
                                    <Input
                                      required
                                      placeholder={steps[0].questoes_da_etapa[0].questao.texto_do_placeholder}
                                      {...field}
                                      className="mb-1 border-[1px] border-highlight bg-transparent placeholder:p-1 placeholder:text-[17px] placeholder:font-bold placeholder:text-[#C2C2C8] focus-visible:ring-[#0cc]"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </motion.div>

                        {/* Email e Telefone */}
                        <motion.div className={
                          cn("absolute top-10 left-0 right-0 px-1 h-[66vh] overflow-auto", {
                            // 'hidden': formStep != 1,
                          })}
                          animate={{
                            translateX: `${100 - formStep * 100}%`,
                          }}
                          transition={{
                            ease: "easeInOut"
                          }}>
                          <div className="space-y-6 mb-12 ">
                            <h2 className="text-2xl font-bold">
                              {parse(steps[1].titulo_da_etapa)}
                              {' '} {clientName}
                            </h2>
                            <h2 className="text-[17px] leading-7">
                              {parse(steps[1].texto_da_etapa)}
                            </h2>
                          </div>
                          <div className="space-y-4 h-full">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem onChange={handleChange}>
                                  <FormLabel className="text-[17px] leading-7">{steps[1].questoes_da_etapa[0].questao.texto_da_questao}</FormLabel>
                                  <FormControl>
                                    <Input
                                      required
                                      placeholder={steps[1].questoes_da_etapa[0].questao.texto_do_placeholder}
                                      {...field}
                                      className="mb-1 border-[1px] border-highlight bg-transparent placeholder:p-1 placeholder:text-[17px] placeholder:font-bold placeholder:text-[#C2C2C8] focus-visible:ring-[#0cc]  "
                                      type="email"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem onChange={handleChange}>
                                  <FormLabel className="text-[17px]  leading-7">{steps[1].questoes_da_etapa[1].questao.texto_da_questao}</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={steps[1].questoes_da_etapa[1].questao.texto_do_placeholder}
                                      {...field}
                                      className="mb-1 border-[1px] border-highlight bg-transparent placeholder:p-1 placeholder:text-[17px] placeholder:font-bold placeholder:text-[#C2C2C8] focus-visible:ring-[#0cc]"
                                      onChange={(e) => {
                                        const { value } = e.target;
                                        e.target.value = formatPhone(value);
                                        field.onChange(e)
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </motion.div>

                        {/* Idade e Gênero */}
                        <motion.div className={
                          cn("absolute top-10 left-0 right-0 px-1 h-[66vh] overflow-scroll", {
                            // 'hidden': formStep != 2,
                          })}
                          animate={{
                            translateX: `${200 - formStep * 100}%`,
                          }}
                          transition={{
                            ease: "easeInOut"
                          }}>
                          <div className="space-y-6 mb-12">
                            <h2 className="text-2xl font-bold">
                              {parse(steps[2].titulo_da_etapa)}
                            </h2>
                            <h2 className="text-[17px]  leading-7">
                              {parse(steps[2].texto_da_etapa)}
                            </h2>
                          </div>
                          <div className="space-y-4 h-full">
                            <FormField
                              control={form.control}
                              name="age"
                              render={({ field }) => (
                                <FormItem onChange={handleChange}>
                                  <FormLabel className="text-[17px]">{steps[2].questoes_da_etapa[0].questao.texto_da_questao}</FormLabel>
                                  <FormControl>
                                    <Input
                                      required
                                      placeholder={steps[2].questoes_da_etapa[0].questao.texto_do_placeholder}
                                      {...field}
                                      className="mb-1 border-[1px] border-highlight bg-transparent placeholder:p-1 placeholder:text-[17px] placeholder:font-bold placeholder:text-[#C2C2C8] focus-visible:ring-[#0cc]"
                                      onChange={(e) => {
                                        const { value } = e.target;
                                        e.target.value = formatNumber(value);
                                        field.onChange(e)
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="gender"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel>{steps[2].questoes_da_etapa[1].questao.texto_da_questao}</FormLabel>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      onChange={handleChange}
                                      className="flex"
                                    >
                                      <FormItem className="flex items-center space-x-3 space-y-0 ab-item">
                                        <FormControl>
                                          <RadioGroupItem value="Fem" className="hidden" />
                                        </FormControl>
                                        <FormLabel className="font-bold text-[18px] text-[#c2c2c8]">
                                          Fem
                                        </FormLabel>
                                      </FormItem>
                                      <FormItem className="flex items-center space-x-3 space-y-0 ab-item">
                                        <FormControl>
                                          <RadioGroupItem value="Masc" className="hidden" />
                                        </FormControl>
                                        <FormLabel className="font-bold text-[18px] text-[#c2c2c8]">
                                          Masc
                                        </FormLabel>
                                      </FormItem>
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </motion.div>

                        {/* Idade de Aposentadoria */}
                        <motion.div className={
                          cn("absolute top-10 left-0 right-0 px-1", {
                            'hidden': formStep != 3,
                          })}
                          animate={{
                            translateX: `${300 - formStep * 100}%`,
                          }}
                          transition={{
                            ease: "easeInOut"
                          }}>
                          <div className="space-y-6 mb-12">
                            <h2 className="text-2xl font-bold">
                              {parse(steps[3].titulo_da_etapa)}
                            </h2>
                            <h2 className="text-[17px]  leading-7">
                              {parse(steps[3].texto_da_etapa)}
                            </h2>
                          </div>
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="retire_age"
                              render={({ field }) => (
                                <FormItem onChange={handleChange}>
                                  <FormLabel className="text-[17px]">{steps[3].questoes_da_etapa[0].questao.texto_da_questao}</FormLabel>
                                  <FormControl>
                                    <Input
                                      required
                                      placeholder={steps[3].questoes_da_etapa[0].questao.texto_do_placeholder}
                                      {...field}
                                      className="mb-1 border-[1px] border-highlight bg-transparent placeholder:p-1 placeholder:text-[17px] placeholder:font-bold placeholder:text-[#C2C2C8] focus-visible:ring-[#0cc]"
                                      onChange={(e) => {
                                        const { value } = e.target;
                                        e.target.value = formatNumber(value);
                                        field.onChange(e)
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </motion.div>

                        {/* Investimento Inicial e Investimento Mensal */}
                        <motion.div className={
                          cn("absolute top-10 left-0 right-0 px-1 h-[66vh] overflow-scroll", {
                            'hidden': formStep != 4,
                          })}
                          animate={{
                            translateX: `${400 - formStep * 100}%`,
                          }}
                          transition={{
                            ease: "easeInOut"
                          }}>
                          <div className="space-y-6 mb-12">
                            <h2 className="text-2xl font-bold">
                              {parse(steps[4].titulo_da_etapa)}
                              {/* {clientName} */}
                            </h2>
                            <h2 className="text-[17px]  leading-7">
                              {parse(steps[4].texto_da_etapa)}
                            </h2>
                          </div>
                          <div className="space-y-4 h-full">
                            <FormField
                              control={form.control}
                              name="initial_investment"
                              render={({ field }) => (
                                <FormItem onChange={handleChange}>
                                  <FormLabel className="text-[17px]">{steps[4].questoes_da_etapa[0].questao.texto_da_questao}</FormLabel>
                                  <FormControl>
                                    <Input
                                      required
                                      placeholder={steps[4].questoes_da_etapa[0].questao.texto_do_placeholder}
                                      {...field}
                                      className="mb-1 border-[1px] border-highlight bg-transparent placeholder:p-1 placeholder:text-[17px] placeholder:font-bold placeholder:text-[#C2C2C8] focus-visible:ring-[#0cc]"
                                      onChange={(e) => {
                                        const { value } = e.target;
                                        e.target.value = formatToReais(e);
                                        field.onChange(e)
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="month_investment"
                              render={({ field }) => (
                                <FormItem onChange={handleChange}>
                                  <FormLabel className="text-[17px]">{steps[4].questoes_da_etapa[1].questao.texto_da_questao}</FormLabel>
                                  <FormControl>
                                    <Input
                                      required
                                      placeholder={steps[4].questoes_da_etapa[1].questao.texto_do_placeholder}
                                      {...field}
                                      className="mb-1 border-[1px] border-highlight bg-transparent placeholder:p-1 placeholder:text-[17px] placeholder:font-bold placeholder:text-[#C2C2C8] focus-visible:ring-[#0cc]"
                                      onChange={(e) => {
                                        const { value } = e.target;
                                        e.target.value = formatToReais(e);
                                        field.onChange(e)
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </motion.div>

                        {/* Perfil do Investidor*/}
                        <motion.div className={
                          cn("absolute top-10 left-0 right-0 px-1  overflow-auto", {
                            'hidden': formStep != 5,
                          })}
                          animate={{
                            translateX: `${500 - formStep * 100}%`,
                          }}
                          transition={{
                            ease: "easeInOut"
                          }}>
                          <div className="space-y-6 mb-12 ">
                            <h2 className="text-2xl font-bold">
                              {parse(steps[5].titulo_da_etapa)}
                            </h2>
                            <h2 className="text-[17px] leading-7">
                              {parse(steps[5].texto_da_etapa)}
                            </h2>
                          </div>
                          <div className="space-y-4 mb-[40px] h-full">
                            <FormField
                              control={form.control}
                              name="investidor_profile"
                              render={({ field }) => (
                                <FormItem className="space-y-3" onChange={handleChange}>
                                  <FormLabel>{steps[5].questoes_da_etapa[0].questao.texto_da_questao}</FormLabel>
                                  <FormMessage />
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      {steps[5].questoes_da_etapa[0].questao.opcoes_de_resposta.map((item: any, index: number) => (
                                        <FormItem className="flex items-center radio-item gap-4 rounded-sm border bg-white px-4 py-2" key={index}>
                                          <FormControl>
                                            <RadioGroupItem value={item.opcao_de_resposta_multipla} />
                                          </FormControl>
                                          <FormLabel className="text-[15px]">
                                            {item.opcao_de_resposta_multipla}
                                          </FormLabel>
                                        </FormItem>

                                      ))}

                                    </RadioGroup>
                                  </FormControl>

                                </FormItem>
                              )}
                            />
                          </div>
                        </motion.div>

                      </div >

                      <div className="pb-5 flex flex-col items-center absolute bottom-0 left-0 w-full">
                        <Button className={cn(
                          "ct h-[56px] w-full max-w-[326px] bg-highlight text-base font-bold text-black", {
                          'hidden': formStep == (steps.length - 1),
                        })} type="button" onClick={() => {

                          if (formStep == 0) {
                            form.trigger("name")
                            const nameState = form.getFieldState("name");
                            if (!nameState.isDirty || nameState.invalid) return;
                            setFormStep(formStep + 1);
                          } else if (formStep == 1) {
                            form.trigger(["email", "phone"])
                            const emailState = form.getFieldState("email");
                            const phoneState = form.getFieldState("phone");
                            if (!emailState.isDirty || emailState.invalid) return;
                            if (!phoneState.isDirty || phoneState.invalid) return;
                            setFormStep(formStep + 1);
                          } else if (formStep == 2) {
                            form.trigger(["age", "gender"])
                            const ageState = form.getFieldState("age");
                            const genderState = form.getFieldState("gender");
                            if (!ageState.isDirty || ageState.invalid) return;
                            if (!genderState.isDirty || genderState.invalid) return;
                            setFormStep(formStep + 1);
                          } else if (formStep == 3) {
                            form.trigger("retire_age")
                            const retireAgeState = form.getFieldState("retire_age");
                            if (!retireAgeState.isDirty || retireAgeState.invalid) return
                            setFormStep(formStep + 1);
                          } else if (formStep == 4) {
                            form.trigger(["initial_investment", "month_investment"])
                            const initialInvestmentState = form.getFieldState("initial_investment");
                            const monthInvestmentState = form.getFieldState("month_investment");
                            if (!initialInvestmentState.isDirty || initialInvestmentState.invalid) return;
                            if (!monthInvestmentState.isDirty || monthInvestmentState.invalid) return;
                            setFormStep(formStep + 1);
                          } else if (formStep == 5) {
                            form.trigger("investidor_profile")
                            const investidorProfileAgeState = form.getFieldState("investidor_profile");
                            if (!investidorProfileAgeState.isDirty || investidorProfileAgeState.invalid) return;
                            setFormStep(formStep + 1);
                          }
                        }}
                        >
                          Ok
                          <Check width={24} height={24} className="ml-1.5" />
                        </Button>

                        <Button className={cn(
                          "ct h-[56px] w-full max-w-[326px] bg-highlight text-base font-bold text-black ", {
                          'hidden': formStep !== (steps.length - 1),
                        })} type="submit"
                        >
                          Entrar
                          <ArrowRight width={24} height={24} className="ml-1.5" />
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </div >
            </Card >
          </>
        )
      }
    </>



  );
}
export default CardWithForm;
