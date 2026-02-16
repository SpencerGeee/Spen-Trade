import { z } from "zod";

export const kycSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    dateOfBirth: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', {
        message: "A valid date of birth is required",
    }),
    country: z.string().min(2, "Country is required"),
    documentType: z.enum(["PASSPORT", "ID_CARD", "DRIVERS_LICENSE"]),
    documentUrl: z.string().url("Document upload is required").optional(), // Optional initially for UI step 1
});

export type KycFormData = z.infer<typeof kycSchema>;
