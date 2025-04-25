import { z } from "zod";

export const medicineValidation = z.object({
  name: z.string().nonempty("Name is required"),
  category: z.string().nonempty("Category is required"),
  requiredPrescription: z.string().nonempty("Prescription is required"),
  manufacturer: z.string().nonempty("Manufacturer is required"),
  expiryDate: z.string({ required_error: "Expiry date is required" }),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be a positive number")
  ),
  quantity: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Quantity must be at least 1")
  ),
  description: z.string().nonempty("Description is required"),
  image: z.instanceof(File).optional(),
});

export const updateMedicineValidation = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  requiredPrescription: z.string().optional(),
  manufacturer: z.string().optional(),
  expiryDate: z.string().optional(),
  price: z
    .preprocess(
      (val) => Number(val),
      z.number().min(0, "Price must be a positive number")
    )
    .optional(),
  quantity: z
    .preprocess(
      (val) => Number(val),
      z.number().min(1, "Quantity must be at least 1")
    )
    .optional(),
  description: z.string().nonempty("Description is required").optional(),
  image: z.instanceof(File).optional(),
});

export const reviewValidation = z.object({
  comment: z.string().nonempty("Name is required"),
  rating: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(0, "Price must be a positive number")
      .max(5, "Rating must be at most 5")
  ),
});
