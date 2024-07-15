import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, { message: "Digite seu nome" }),
  // email: z.string().email("Digite um email válido"),
  email: z.coerce.string().email().min(5 , {message: "Digite um email válido"}),
  phone: z.string().min(11, {message: "Digite um telefone válido"}),
  // age: z.coerce.number().min(2, {message:"Digite um idade válida"}).max(100),
  age: z.string().min(2, {message:"Digite um idade válida"}).max(100),
  // retire_age: z.coerce.number().min(2, {message:"Digite um idade válida"}).max(100),
  retire_age: z.string().min(2, {message:"Digite um idade válida"}).max(100),
  // initial_investment: z.coerce.number(),
  initial_investment: z.string(),
  // month_investment: z.coerce.number(),
  month_investment: z.string(),
  gender: z.string().min(2, { message: "Selecione um gênero" }).max(10),
  investidor_profile: z.string().min(1, { message: "Selecione um perfil" }).max(255),
});

