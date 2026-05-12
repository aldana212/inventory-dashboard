import { z } from "zod";

export const productMovementSchema = z.object({
  productId: z.preprocess(
    (val) => (val === null ? "" : val),
    z.number().min(1, "Debes seleccionar un producto"),
  ),
  type: z.enum(["STOCK_IN", "STOCK_OUT", "STOCK_ADJUSTMENT"], {
    errorMap: () => ({ message: "Debes seleccionar un tipo válido" }),
  }),

  quantity: z.coerce
    .number({
      required_error: "La cantidad es obligatoria",
    })
    .positive("Debe ser mayor a 0"),

  note: z
    .string()
    .max(255, "La nota no puede superar los 255 caracteres")
    .optional(),
});
