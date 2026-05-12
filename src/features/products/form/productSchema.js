import * as z from "zod";

const imageItemSchema = z
  .object({
    id: z.number().optional(),
    url: z.string().optional(),
    publicId: z.string().optional(),
    position: z.number().optional(),
    status: z.string().optional(), // current = actual, new = nueva, replace: reemplazar, delete: Eliminar

    file: z.instanceof(File).optional(),

    existing: z.boolean(),
  })
  .superRefine((img, ctx) => {
    // Si es imagen vieja
    if (img.existing) {
      if (!img.id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["id"],
          message: "Falta id de imagen existente",
        });
      }

      if (!img.url) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["url"],
          message: "Falta url de imagen existente",
        });
      }
    }

    // Si es nueva
    if (!img.existing) {
      if (!img.file) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["file"],
          message: "Debes subir una imagen",
        });
        return;
      }

      if (!img.file.type.startsWith("image/")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["file"],
          message: "Solo se permiten imágenes",
        });
      }

      if (img.file.size > 5 * 1024 * 1024) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["file"],
          message: "Máximo 5MB",
        });
      }
    }
  });

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(100, "Máximo 100 caracteres"),

  sku: z
    .string()
    .min(1, "El SKU es obligatorio")
    .regex(/^[A-Z0-9-]+$/, "Solo mayúsculas, números y guiones"),
  category: z.number().min(1, "Selecciona una categoría"),
  purchasePrice: z.coerce.number().positive(),
  salePrice: z.coerce.number().positive(),
  currentStock: z.coerce.number().min(1),
  minimumStock: z.coerce.number().min(1),
  supplier: z.preprocess(
    (val) => (val === null ? undefined : val),
    z.string().optional(),
  ),
  isActive: z.boolean().default(true),
  description: z.string().max(500, "Máximo 500 caracteres").optional(),
  image: z.array(imageItemSchema).max(6, "Máximo 6 imágenes").optional(),
});
