import { z } from "zod";

export const offerSchema = z.object({
    type: z.enum(["BUY", "SELL"]),
    cryptocurrency: z.string().min(1, "Select a cryptocurrency"),
    fiatCurrency: z.string().min(1, "Select a fiat currency"),
    priceType: z.enum(["FIXED", "MARKET"]),
    priceMargin: z.number().optional(),
    fixedPrice: z.number().optional(),
    minAmount: z.number().min(1, "Minimum amount is required"),
    maxAmount: z.number().min(1, "Maximum amount is required"),
    paymentMethod: z.string().min(1, "Select a payment method"),
    terms: z.string().optional(),
}).refine((data) => data.maxAmount > data.minAmount, {
    message: "Max amount must be greater than min amount",
    path: ["maxAmount"],
});

export type OfferFormData = z.infer<typeof offerSchema>;
