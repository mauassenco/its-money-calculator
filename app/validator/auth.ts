import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, { message: "Digite seu nome" }),
  email: z.string().email({message: "Digite um email válido"}).min(0 , {message: "Digite um email válido"}),
  phone: z.string().min(14, { message: 'Telefone com DDD deve ter 11 números' }),
  age: z.string().min(1, { message: "Digite sua idade" }),
  // age: z.number().gte(18, 'Must be 18 or older').lte(100, 'Must be 100 or younger'),
  retire_age: z.string().min(1, { message: "Digite com qual idade deseja se aposentar" }),
  initial_investment: z.string().min(10, { message: "Digite um valor inicial" }),
  month_investment: z.string().min(1, { message: "Digite o valor mensal de contribuição " }),
  gender: z.string().min(2, { message: "Selecione um gênero" }).max(10),
  investidor_profile: z.string().min(1, { message: "Selecione um perfil" }).max(255),
});

