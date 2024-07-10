import { ChevronLeft, LogOut, PlusIcon, XIcon } from "lucide-react"
import { Button } from "../_components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../_components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../_components/ui/tabs"
import { Separator } from "@radix-ui/react-separator"
import MoneyBagIcon from "./icons/MoneyBagIcon"
import PigSafeIcon from "./icons/PigSafeIcon"
import CallAttendantIcon from "./icons/CallAttendantIcon"
import WhatssappIcon from "./icons/WhatssappIcon"
import PlusIconCustom from "./icons/PlusIconCustom"
import HandOnFile from "./icons/HandOnFile"
import { useState } from "react"
import { randomUUID } from "crypto"
import { checkNumberType } from "../_lib/functions"


type Simulation = {
  simulationData: {
    name: string;
    email?: string;
    phone?: string;
    age?: number;
    retire_age?: number;
    initial_investment?: number;
    monthly_investment?: number;
    investidor_profile?: string;
    gender?: string;
    amountDeposited?: number;
    investimentTimeInMonths?: number;
    totalEarned?: number;

  };
};


export function SimulationResult() {
  const sessionSimulationsRaw = sessionStorage.getItem('Simulações');
  const sessionSimulations: Simulation[] = JSON.parse(sessionSimulationsRaw as any)

  const simulationDataItems = sessionSimulations[sessionSimulations.length - 1].simulationData

  const [formDataNew, setFormDataNew] = useState({});

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormDataNew({ ...formDataNew, [name]: value });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const simulationData = { ...formDataNew }
    let storedData = JSON.parse(window.sessionStorage.getItem('Simulações') || '[]');
    storedData.push({ randomUUID, simulationData });
    window.sessionStorage.setItem('Simulações', JSON.stringify(storedData));
  };


  return (
    <Tabs defaultValue="salary" className="w-full pb-10 ">
      <div className="w-full bg-highlight flex items-center justify-between h-[64px] pl-2 pr-6">
        <div className="flex items-center gap-4 text-black font-semibold w-[50%] text-[15px]">
          <ChevronLeft width={24} height={24} />
          <h3>Resultado</h3>
        </div>

        <TabsList className="grid grid-cols-[auto_auto] bg-[#0FF] p-1 ">
          <TabsTrigger value="salary">Salário</TabsTrigger>
          <TabsTrigger value="rentability">Rentabilidade</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="salary" className="border-[1px] border-highlight m-5 px-4 py-8 bxs-sm rounded pt-0">
        <Card >
          <CardHeader className="gap-8">
            <CardTitle className="flex justify-center items-center gap-6 ">
              <MoneyBagIcon />
              <div className="flex gap-2">
                <h3 className="text-[32px] leading-9 flex gap-1.5 font-Big_Shoulders_Text font-bold"><span>R$</span>
                  {sessionSimulations[sessionSimulations.length - 1].simulationData.amountDeposited}
                  <span className="uppercase">{checkNumberType(Number(simulationDataItems.amountDeposited))}</span></h3>
              </div>
            </CardTitle>
            <CardDescription className="text-[17px] text-center leading-7 p-0 m-0">
              Será o valor disponível para sua aposentadoria num plano de <strong>Previdência Privada</strong> disponibilizado pela Blue3 Investimentos.
            </CardDescription>
            <Separator className="h-[1px] bg-[#E5E5E7]" />
          </CardHeader>

          <CardContent className="px-1">
            <div className="grid grid-cols-[1fr_24px_1fr] py-8 m-0">
              <div className="flex items-center flex-col justify-between gap-4">
                <div className="bg-[#003] rounded-full w-[72px] h-[72px] flex items-center justify-center flex-col">
                  <h3 className="text-[18px] text-highlight font-bold">INSS</h3>
                </div>
                <div>
                  <p className="text-center text-[15px]">Como aposentado pelo INSS* você receberia</p>
                  <p className="font-bold text-[16px] mt-4 text-center">1 salário mínimo</p>
                </div>
              </div>

              <div className=" h-[175px] mt-6">
                <XIcon className="text-highlight" />
              </div>

              <div className="flex items-center flex-col justify-between gap-4">
                <div className="bg-[#003] rounded-full w-[72px] h-[72px] flex items-center justify-center flex-col">
                  <PigSafeIcon />
                </div>
                <div>
                  <p className="text-center text-[15px]">Na poupança você teria acumulado aproximadamente</p>
                  <p className="font-bold text-[16px] mt-4 text-center"><span className="mr-[3px]">R$</span>{sessionSimulations[sessionSimulations.length - 1].simulationData.amountDeposited}<span className="ml-[3px]">mil</span></p>
                </div>
              </div>

            </div>
            <Separator className="h-[1px] bg-[#E5E5E7]" />

          </CardContent>
          <CardFooter className="p-0">
            <p className="leading-[18px] text-[12px] mt-8 text-center">*O INSS não tem rentabilidade, pois não existe a possibilidade de sacar o dinheiro que foi acumulado, ele é gerido pelo governo com rentabilidade próxima à caderneta de poupança.</p>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="rentability" className="border-[1px] border-highlight m-5 px-4 py-8 bxs-sm rounded pt-0">
        <Card >
          <CardHeader className="gap-8">
            <CardTitle className="flex justify-center items-center gap-6 ">
              <MoneyBagIcon />
              <div className="flex gap-2">
                <h3 className="text-[32px] leading-9 flex gap-1.5 font-Big_Shoulders_Text font-bold"><span>R$</span> {sessionSimulations[sessionSimulations.length - 1].simulationData.amountDeposited}<span className="uppercase">{checkNumberType(Number(simulationDataItems.amountDeposited))}</span></h3>
              </div>
            </CardTitle>
            <CardDescription className="text-[17px] text-center leading-7 p-0 m-0">Valor total na <strong>Previdência Privada</strong>
            </CardDescription>
            <Separator className="h-[1px] bg-[#E5E5E7]" />
          </CardHeader>

          <CardContent className="px-1">
            <div className="grid grid-cols-[1fr_24px_1fr] pt-8 m-0">
              <div className="flex items-center flex-col gap-4">
                <div className="bg-[#003] rounded-full w-[72px] h-[72px] flex items-center justify-center flex-col">
                  <PigSafeIcon />
                </div>
                <div>
                  <p className="mb-4 font-bold text-[16px] text-center"><span className="mr-[3px]">R$</span> {sessionSimulations[sessionSimulations.length - 1].simulationData.amountDeposited}<span className="ml-[3px]">mil</span></p>
                  <p className="text-center text-[15px]">Poupança</p>
                </div>
              </div>

              <div className=" h-[127px] mt-6">
                <XIcon className="text-highlight" />
              </div>

              <div className="flex items-center flex-col gap-4">
                <div className="bg-[#003] rounded-full w-[72px] h-[72px] flex items-center justify-center flex-col">
                  <HandOnFile />
                </div>
                <div>
                  <p className="mb-4 font-bold text-[16px] text-center"><span className="mr-[3px]">R$</span> {sessionSimulations[sessionSimulations.length - 1].simulationData.amountDeposited}<span className="ml-[3px]">milhões</span></p>
                  <p className="text-center text-[15px] text-nowrap">Previdência Privada</p>
                </div>
              </div>

            </div>

          </CardContent>
          <CardFooter className="p-0">
          </CardFooter>
        </Card>
      </TabsContent>

      <Card>
        <div className="bg-highlight rounded py-8 px-4 m-5">
          <div className="flex m-0 p-0 gap-6">
            <div className="w-12 h-12">
              <CallAttendantIcon />
            </div>
            <div className="text-[15px] leading-6">
              <p><strong>Deseja falar com os especialistas</strong> em Previdência Privada da Blue3 Investimentos para uma assessoria sem compromisso?</p>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button className="font-bold text-sm leading-[18px] text-black text-center bg-white bxs-sm px-8">Quero uma avaliação personalizada</Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex gap-2 py-0 px-4">
          <div className="rounded flex flex-col items-center border border-highlight w-[50%] bg-white p-4 gap-4">
            <div className="w-12 h-12">
              <WhatssappIcon />
            </div>
            <div className="text-center font-bold leading-5 text-[16px]">
              <p>Quero receber os resultados pelo WhatsApp</p>
            </div>
          </div>
          <div className="rounded flex flex-col items-center border border-highlight w-[50%] bg-white p-4 gap-4">
            <div className="w-12 h-12" onClick={() => document.getElementById('new_simulation').showModal()}>
              <PlusIconCustom />
            </div>
            <div className="text-center font-bold leading-5 text-[16px]">
              <p>Fazer uma nova simulação</p>
            </div>
          </div>

        </div>
      </Card>

      <Card>
        <div className="join join-vertical w-full py-0 px-4 pt-4 bg-[180 100% 45%]">
          <div className="collapse collapse-arrow border-highlight border rounded mb-6 bg-white">
            <input type="checkbox" name="simulations-history" />
            <div className="collapse-title text-[15px] ">Histórico de simulações</div>

            <div className="collapse-content rounded space-y-4">

              {sessionSimulations.map(simulation => (
                <div className="p-4 border-highlight border rounded space-y-6">
                  <h3 className="font-bold text-[18px] flex items-center"><span className="bg-highlight rounded-full w-[7px] h-[7px] mr-[6px]"></span>{simulation.simulationData.amountDeposited} <span className="mx-[2px]">Mil</span>(previdência)</h3>
                  <p className="text-[15px]">Aposentar aos: <span className="font-bold">{simulation.simulationData.retire_age}anos</span></p>
                  <div className="flex">
                    <div className="space-y-4 w-1/2">
                      <p className="font-bold text-[16px] leading-5"><span className="mr-[3px]">R$</span>{simulation.simulationData.amountDeposited}<span className="ml-[3px]">mil</span></p>
                      <p className="text-[#EE3939] text-[15px] leading-6">INSS</p>
                    </div>

                    <div className="space-y-4 w-1/2 pl-6 border-[#E5E5E7] border-l-[1px]">
                      <p className="font-bold text-[16px] leading-5"><span className="mr-[3px]">R$</span> {sessionSimulations[sessionSimulations.length - 1].simulationData.amountDeposited}<span className="ml-[3px]">mil</span></p>
                      <p className="text-[15px] leading-6">Poupança</p>
                    </div>
                  </div>
                </div>
              ))}
              {/* <div className="p-4 border-highlight border rounded space-y-6">
                <h3 className="font-bold text-[18px]">4 milhões (previdência)</h3>
                <p className="text-[15px]">Aposentar aos: <span className="font-bold">65 anos</span></p>
                <div className="flex">
                  <div className="space-y-4 w-1/2">
                    <p className="font-bold text-[16px] leading-5"><span className="mr-[3px]">R$</span>230<span className="ml-[3px]">mil</span></p>
                    <p className="text-[#EE3939] text-[15px] leading-6">INSS</p>
                  </div>

                  <div className="space-y-4 w-1/2 pl-6 border-[#E5E5E7] border-l-[1px]">
                    <p className="font-bold text-[16px] leading-5"><span className="mr-[3px]">R$</span>{sessionSimulations[sessionSimulations.length - 1].simulationData.amountDeposited}<span className="ml-[3px]">mil</span></p>
                    <p className="text-[15px] leading-6">Poupança</p>
                  </div>
                </div>
              </div> */}

            </div>
          </div>
          {(sessionSimulations.length == 0) && (<p className="text-center text-[12px]">Não há mais de uma simulação realizada.</p>)}
        </div>
      </Card>

      {/* <dialog id="new_simulation" className="modal bg-[background: rgba(0, 0, 0, 0.50)]">
        <div className="modal-box bg-white rounded py-8 px-6" >
          <div className="flex items-center gap-2 mb-8">
            <PlusIconCustom />
            <h3 className="font-bold text-[32px] leading-[35px] font-Big_Shoulders_Text  text-black uppercase">Nova Simulação</h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-2">
            <label className="input flex items-center  rounded gap-2 h-[56px] bg-white bsx-sm-v2 border border-gray-600;">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <mask
                  id="mask0_9533_121"
                  style={{ maskType: "alpha" }}
                  width="24"
                  height="24"
                  x="0"
                  y="0"
                  maskUnits="userSpaceOnUse"
                >
                  <path fill="#D9D9D9" d="M0 0H24V24H0z"></path>
                </mask>
                <g mask="url(#mask0_9533_121)">
                  <path
                    fill="#0CC"
                    d="M11.975 18.8a.649.649 0 00.475-.2.649.649 0 00.2-.475V17.6a4.283 4.283 0 002.113-.875c.625-.483.937-1.208.937-2.175 0-.7-.204-1.32-.612-1.862-.409-.542-1.213-1.03-2.413-1.463-1.05-.35-1.75-.658-2.1-.925-.35-.267-.525-.633-.525-1.1 0-.467.18-.85.538-1.15.358-.3.845-.45 1.462-.45.367 0 .692.07.975.212.283.142.517.33.7.563.133.15.28.254.438.313a.531.531 0 00.437-.013.72.72 0 00.412-.4.471.471 0 00-.062-.5 3.462 3.462 0 00-.987-.95A2.686 2.686 0 0012.7 6.4v-.525a.649.649 0 00-.2-.475.649.649 0 00-.475-.2.649.649 0 00-.475.2.649.649 0 00-.2.475V6.4c-.85.167-1.504.512-1.962 1.037C8.929 7.962 8.7 8.55 8.7 9.2c0 .75.225 1.354.675 1.812.45.459 1.192.871 2.225 1.238 1.067.4 1.792.754 2.175 1.062.383.309.575.721.575 1.238 0 .633-.225 1.092-.675 1.375-.45.283-.958.425-1.525.425a2.39 2.39 0 01-1.3-.362c-.383-.242-.7-.588-.95-1.038a.805.805 0 00-.412-.35.683.683 0 00-.513 0 .689.689 0 00-.375.375.582.582 0 000 .525c.267.567.625 1.017 1.075 1.35.45.333.992.567 1.625.7v.575c0 .183.067.342.2.475.133.133.292.2.475.2zM12 21.5a9.263 9.263 0 01-3.712-.75 9.58 9.58 0 01-3.013-2.025 9.58 9.58 0 01-2.025-3.013A9.263 9.263 0 012.5 12c0-1.317.25-2.554.75-3.713a9.583 9.583 0 012.025-3.012A9.58 9.58 0 018.288 3.25 9.263 9.263 0 0112 2.5a9.27 9.27 0 013.713.75 9.583 9.583 0 013.012 2.025 9.583 9.583 0 012.025 3.012A9.27 9.27 0 0121.5 12c0 1.317-.25 2.554-.75 3.712a9.58 9.58 0 01-2.025 3.013 9.583 9.583 0 01-3.012 2.025A9.27 9.27 0 0112 21.5zm0-1.5c2.217 0 4.104-.779 5.663-2.337C19.221 16.104 20 14.217 20 12s-.779-4.104-2.337-5.663C16.104 4.779 14.217 4 12 4s-4.104.779-5.662 2.337C4.779 7.896 4 9.783 4 12s.78 4.104 2.338 5.663C7.896 19.221 9.783 20 12 20z"
                  ></path>
                </g>
              </svg>
              <input type="text" name="initial_investment" className="grow" placeholder="Investimento (inicial)" onChange={handleChange} />
            </label>
            <label className="input flex items-center  rounded gap-2 h-[56px] bg-white bsx-sm-v2 border border-gray-600;">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <mask
                  id="mask0_9533_121"
                  style={{ maskType: "alpha" }}
                  width="24"
                  height="24"
                  x="0"
                  y="0"
                  maskUnits="userSpaceOnUse"
                >
                  <path fill="#D9D9D9" d="M0 0H24V24H0z"></path>
                </mask>
                <g mask="url(#mask0_9533_121)">
                  <path
                    fill="#0CC"
                    d="M11.975 18.8a.649.649 0 00.475-.2.649.649 0 00.2-.475V17.6a4.283 4.283 0 002.113-.875c.625-.483.937-1.208.937-2.175 0-.7-.204-1.32-.612-1.862-.409-.542-1.213-1.03-2.413-1.463-1.05-.35-1.75-.658-2.1-.925-.35-.267-.525-.633-.525-1.1 0-.467.18-.85.538-1.15.358-.3.845-.45 1.462-.45.367 0 .692.07.975.212.283.142.517.33.7.563.133.15.28.254.438.313a.531.531 0 00.437-.013.72.72 0 00.412-.4.471.471 0 00-.062-.5 3.462 3.462 0 00-.987-.95A2.686 2.686 0 0012.7 6.4v-.525a.649.649 0 00-.2-.475.649.649 0 00-.475-.2.649.649 0 00-.475.2.649.649 0 00-.2.475V6.4c-.85.167-1.504.512-1.962 1.037C8.929 7.962 8.7 8.55 8.7 9.2c0 .75.225 1.354.675 1.812.45.459 1.192.871 2.225 1.238 1.067.4 1.792.754 2.175 1.062.383.309.575.721.575 1.238 0 .633-.225 1.092-.675 1.375-.45.283-.958.425-1.525.425a2.39 2.39 0 01-1.3-.362c-.383-.242-.7-.588-.95-1.038a.805.805 0 00-.412-.35.683.683 0 00-.513 0 .689.689 0 00-.375.375.582.582 0 000 .525c.267.567.625 1.017 1.075 1.35.45.333.992.567 1.625.7v.575c0 .183.067.342.2.475.133.133.292.2.475.2zM12 21.5a9.263 9.263 0 01-3.712-.75 9.58 9.58 0 01-3.013-2.025 9.58 9.58 0 01-2.025-3.013A9.263 9.263 0 012.5 12c0-1.317.25-2.554.75-3.713a9.583 9.583 0 012.025-3.012A9.58 9.58 0 018.288 3.25 9.263 9.263 0 0112 2.5a9.27 9.27 0 013.713.75 9.583 9.583 0 013.012 2.025 9.583 9.583 0 012.025 3.012A9.27 9.27 0 0121.5 12c0 1.317-.25 2.554-.75 3.712a9.58 9.58 0 01-2.025 3.013 9.583 9.583 0 01-3.012 2.025A9.27 9.27 0 0112 21.5zm0-1.5c2.217 0 4.104-.779 5.663-2.337C19.221 16.104 20 14.217 20 12s-.779-4.104-2.337-5.663C16.104 4.779 14.217 4 12 4s-4.104.779-5.662 2.337C4.779 7.896 4 9.783 4 12s.78 4.104 2.338 5.663C7.896 19.221 9.783 20 12 20z"
                  ></path>
                </g>
              </svg>
              <input type="text" name="month_investment" className="grow" placeholder="Investimento (mensal)" onChange={handleChange} />
            </label>
            <label className="input flex items-center  rounded gap-2 h-[56px] bg-white bsx-sm-v2 border border-gray-600;">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <mask
                  id="mask0_9533_121"
                  style={{ maskType: "alpha" }}
                  width="24"
                  height="24"
                  x="0"
                  y="0"
                  maskUnits="userSpaceOnUse"
                >
                  <path fill="#D9D9D9" d="M0 0H24V24H0z"></path>
                </mask>
                <g mask="url(#mask0_9533_121)">
                  <path
                    fill="#0CC"
                    d="M11.975 18.8a.649.649 0 00.475-.2.649.649 0 00.2-.475V17.6a4.283 4.283 0 002.113-.875c.625-.483.937-1.208.937-2.175 0-.7-.204-1.32-.612-1.862-.409-.542-1.213-1.03-2.413-1.463-1.05-.35-1.75-.658-2.1-.925-.35-.267-.525-.633-.525-1.1 0-.467.18-.85.538-1.15.358-.3.845-.45 1.462-.45.367 0 .692.07.975.212.283.142.517.33.7.563.133.15.28.254.438.313a.531.531 0 00.437-.013.72.72 0 00.412-.4.471.471 0 00-.062-.5 3.462 3.462 0 00-.987-.95A2.686 2.686 0 0012.7 6.4v-.525a.649.649 0 00-.2-.475.649.649 0 00-.475-.2.649.649 0 00-.475.2.649.649 0 00-.2.475V6.4c-.85.167-1.504.512-1.962 1.037C8.929 7.962 8.7 8.55 8.7 9.2c0 .75.225 1.354.675 1.812.45.459 1.192.871 2.225 1.238 1.067.4 1.792.754 2.175 1.062.383.309.575.721.575 1.238 0 .633-.225 1.092-.675 1.375-.45.283-.958.425-1.525.425a2.39 2.39 0 01-1.3-.362c-.383-.242-.7-.588-.95-1.038a.805.805 0 00-.412-.35.683.683 0 00-.513 0 .689.689 0 00-.375.375.582.582 0 000 .525c.267.567.625 1.017 1.075 1.35.45.333.992.567 1.625.7v.575c0 .183.067.342.2.475.133.133.292.2.475.2zM12 21.5a9.263 9.263 0 01-3.712-.75 9.58 9.58 0 01-3.013-2.025 9.58 9.58 0 01-2.025-3.013A9.263 9.263 0 012.5 12c0-1.317.25-2.554.75-3.713a9.583 9.583 0 012.025-3.012A9.58 9.58 0 018.288 3.25 9.263 9.263 0 0112 2.5a9.27 9.27 0 013.713.75 9.583 9.583 0 013.012 2.025 9.583 9.583 0 012.025 3.012A9.27 9.27 0 0121.5 12c0 1.317-.25 2.554-.75 3.712a9.58 9.58 0 01-2.025 3.013 9.583 9.583 0 01-3.012 2.025A9.27 9.27 0 0112 21.5zm0-1.5c2.217 0 4.104-.779 5.663-2.337C19.221 16.104 20 14.217 20 12s-.779-4.104-2.337-5.663C16.104 4.779 14.217 4 12 4s-4.104.779-5.662 2.337C4.779 7.896 4 9.783 4 12s.78 4.104 2.338 5.663C7.896 19.221 9.783 20 12 20z"
                  ></path>
                </g>
              </svg>
              <input type="text" name="retire_age" className="grow" placeholder="Idade de aposentadoria" onChange={handleChange} />
            </label>
            ``
            <div className="pt-8" >
              <Button className=" relative w-full h-[56px] bg-highlight rounded bxs-sm" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                  <mask id="mask0_9533_90" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                    <rect x="0.5" width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_9533_90)">
                    <path d="M12.5 18.75C12.2833 18.75 12.1043 18.6793 11.963 18.538C11.821 18.396 11.75 18.2167 11.75 18V12.75H6.5C6.28333 12.75 6.10433 12.679 5.963 12.537C5.821 12.3957 5.75 12.2167 5.75 12C5.75 11.7833 5.821 11.604 5.963 11.462C6.10433 11.3207 6.28333 11.25 6.5 11.25H11.75V6C11.75 5.78333 11.821 5.60433 11.963 5.463C12.1043 5.321 12.2833 5.25 12.5 5.25C12.7167 5.25 12.896 5.321 13.038 5.463C13.1793 5.60433 13.25 5.78333 13.25 6V11.25H18.5C18.7167 11.25 18.896 11.3207 19.038 11.462C19.1793 11.604 19.25 11.7833 19.25 12C19.25 12.2167 19.1793 12.3957 19.038 12.537C18.896 12.679 18.7167 12.75 18.5 12.75H13.25V18C13.25 18.2167 13.1793 18.396 13.038 18.538C12.896 18.6793 12.7167 18.75 12.5 18.75Z" fill="black" />
                  </g>
                </svg>
                <p className="font-bold text-[16px] leading-5 text-black ml-[6px]">Nova simulação</p>
                <form method="dialog" className="modal-backdrop absolute w-full h-full">
                  <button>close</button>
                </form>
              </Button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog> */}

    </Tabs >
  )
}

export default SimulationResult;