import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, { message: "Digite seu nome" }).max(255),
  email: z.string().email({ message: "Digite seu email" }),
  phone: z.string().min(10, { message: "Digite seu telefone" }),
  age: z.number().min(2).max(3, { message: "Digite sua idade" }),
  retire_age: z.number().min(2).max(3, { message: "Digite a idade que deseja se aposentar" }),
  initial_investment: z.number(),
  month_investment: z.number(),
  gender: z.enum(["a", "b"], {
    required_error: "You need to select a notification type. A/B",
  }),
  investidor_profile:  z.enum(["a", "b", "c"], {
    required_error: "You need to select a notification type. MULTI",
  }),
});
