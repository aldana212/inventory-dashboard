import z from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(50, "Máximo 50 caracteres"),
  description: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres"),
  isActive: z.boolean().default(true),
  icon: z.string().min(1, "Selecciona un icono"),
});
