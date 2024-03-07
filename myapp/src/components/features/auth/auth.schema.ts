import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

const passwordVerification = new RegExp(/^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{12,}$/i);

export const SignUpSchema = z.object({
  username: z.string().min(4, {message: "Le nom d'utilisateur doit contenir au minimum 4 caractères."}),
  email: z.string().email({message: "Format de mail incorrect."}),
  password: z.string().min(12, {message: "Le mot de passe doit être d'au moins 12 caractères."}).regex(passwordVerification, {message: "Le mot de passe doit contenir 1 majuscule, 1 minuscule et 1 caractère spécial."}),
  confirmation: z.string()
}).refine(({confirmation, password}) => confirmation === password, {
  message: "Les mots de passe doivent être identiques.",
  path: ["confirmation"]
})