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

export const printingSpecsSchema = z.object({
    defaultPagesA4: z.number().min(0, "Phải lớn hơn 0"),
    defaultPagesA3: z.number().min(0, "Phải lớn hơn không"),
    resetStartDate: z.date(),
    resetEndDate: z.date(),
    resetPeriod: z.enum(["daily", "weekly", "monthly", "quarterly", "yearly"]),
    permittedFileTypes: z.array(z.string()).min(1, "Chọn ít nhất 1 loại"),
});

export type PrintingSpecsFormValues = z.infer<typeof printingSpecsSchema>;

export const addPrinterSchema = z.object({
    campusId: z.enum(["cs1", "cs2"]),
    room: z.string().min(1, "Room is required"),
    model: z.string().min(1, "Model is required"),
    type: z
        .array(z.enum(["bw", "color"]))
        .min(1, "At least one type is required"),
    functional: z
        .array(z.enum(["single", "double", "scan"]))
        .min(1, "At least one function is required"),
});
