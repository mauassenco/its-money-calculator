import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, { message: "Digite seu nome" }),
  email: z.coerce.string().email({message: "Digite um email válido"}).min(0 , {message: "Digite um email válido"}),
  phone: z.string().min(14, { message: 'Telefone com DDD deve ter 11 números' }),
  age: z.string(),
  // age: z.number().gte(18, 'Must be 18 or older').lte(100, 'Must be 100 or younger'),
  retire_age: z.string(),
  initial_investment: z.string(),
  month_investment: z.string(),
  gender: z.string().min(2, { message: "Selecione um gênero" }).max(10),
  investidor_profile: z.string().min(1, { message: "Selecione um perfil" }).max(255),
});

