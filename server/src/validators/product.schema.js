import { z } from "zod"

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  quantity: z.coerce.number().int().nonnegative(),
  price: z.coerce.number().positive(),
  stockAlertThreshold: z.coerce.number().int().nonnegative().optional(),
})

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  sku: z.string().min(1).optional(),
  quantity: z.coerce.number().int().nonnegative().optional(),
  price: z.coerce.number().positive().optional(),
  stockAlertThreshold: z.coerce.number().int().nonnegative().optional(),
})
