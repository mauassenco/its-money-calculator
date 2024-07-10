import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, { message: "Digite seu nome" }).max(255),
  email: z.string().email({ message: "Digite seu email" }),
  phone: z.string().min(10, { message: "Digite seu telefone" }),
  age: z.string(),
  retire_age: z.string(),
  initial_investment: z.string(),
  month_investment: z.number(),
  gender: z.enum(["Fem", "Masc"], {
    required_error: "You need to select a notification type. A/B",
  }),
  investidor_profile:  z.enum(["a", "b", "c"], {
    required_error: "You need to select a notification type. MULTI",
  }),
});
