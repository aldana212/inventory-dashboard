import * as z from "zod";

export const userSchema = z.object({
  firstName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre es demasiado largo"),

  lastName: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido es demasiado largo"),

  email: z.string().email("Correo electrónico inválido"),
  rol: z.number().int().min(1).max(4),
  brandColor: z.string().min(1),
});
