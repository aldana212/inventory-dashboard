import z from "zod";

/* ----------------------------- COMMON RULES ----------------------------- */

export const passwordRules = z
  .string()
  .min(8, "Debe tener mínimo 8 caracteres")
  .max(64, "Máximo 64 caracteres")
  .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
  .regex(/[a-z]/, "Debe contener al menos una minúscula")
  .regex(/[0-9]/, "Debe contener al menos un número")
  .regex(/[^A-Za-z0-9]/, "Debe contener al menos un símbolo");

export const confirmPasswordRules = z.string().min(1, "Confirma la contraseña");

export const currentPasswordRules = z
  .string()
  .min(6, "La contraseña actual es inválida");

/* ------------------------------- SCHEMAS ------------------------------- */

export const authSchema = z.object({
  email: z.email("This is not a valid email."),
  password: passwordRules,
  remember: z.boolean().default(false).optional(),
});

export const passwordSchema = z
  .object({
    currentPassword: currentPasswordRules,
    password: passwordRules,
    confirmPassword: confirmPasswordRules,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: currentPasswordRules,
    newPassword: passwordRules,
    confirmPassword: confirmPasswordRules,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
