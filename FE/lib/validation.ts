import * as z from "zod";

export const SignInSchema = z.object({
    username: z.string(),
    password: z.string().min(8),
});

export const uploadSchema = z.object({
    file: z.any().refine((files) => files?.length == 1, "File is required."),
    size: z.enum(["A3", "A4"]),
    functional: z.enum(["single", "double", "scan"]),
    type: z.enum(["bw", "color"]),
    pageRange: z.enum(["all", "range"]),
    rangeValue: z
        .string()
        .optional()
        .refine((val) => {
            if (val === undefined) return true;
            return /^(\d+-\d+)(,\s*\d+-\d+)*$/.test(val);
        }, "Invalid range format"),
    copies: z.number().int().min(1, "Minimum 1 copy required"),
    additionalInfo: z.string().optional(),
});
