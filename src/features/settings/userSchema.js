import { z } from "zod";

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

  phone: z
    .string()
    .trim()
    .refine(
      (val) => val === "" || /^[0-9+()\s-]{7,15}$/.test(val),
      "Teléfono inválido",
    )
    .optional(),

  status: z.string().min(1),

  brandColor: z.object({
    bg: z.string().min(1, "Color de fondo requerido"),

    color: z.string().min(1, "Color de texto requerido"),
  }),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "La contraseña actual es inválida"),

    newPassword: z
      .string()
      .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
      .max(100)
      .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
      .regex(/[a-z]/, "Debe tener al menos una minúscula")
      .regex(/[0-9]/, "Debe tener al menos un número"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
