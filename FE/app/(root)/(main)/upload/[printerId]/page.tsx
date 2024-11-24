"use client";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UploadData, PrintingOrder, printerDetail } from "@/types";
import { calculatePageCount } from "@/hooks/use-pdfjs";
import { uploadSchema } from "@/lib/validation";
import { getPrinterSpec } from "@/services/GetPrinters";
import { useAuth } from "@/context/AuthContext";
import { usePDFJS } from "@/hooks/use-pdfjs";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { uploadFileToCDN } from "@/services/FileAction";
import { set } from "zod";

const pageLeft = {
    A4: 30,
    A3: 15,
};

const allowFileTypes = [".pdf", ".doc", ".docx"];

type PrinterSpec = Pick<printerDetail["info"], "type" | "functional">;

export default function page({
    params,
}: {
    params: Promise<{ printerId: number }>;
}) {
    const { printerId } = use(params);
    const { studentInfo } = useAuth();
    const [pageCount, setPageCount] = useState<number | null>(null);
    const [expectedPages, setExpectedPages] = useState<number | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileId, setFileId] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<"A4" | "A3">("A4");
    const [printerSpecs, setPrinterSpecs] = useState<PrinterSpec | null>(null);
    const [isPDF, setIsPDF] = useState<boolean>(false);
    const [isDropped, setIsDropped] = useState<boolean>(false);
    const router = useRouter();
    const pdfjs = usePDFJS();
    const { toast } = useToast();
    // would be fetched from the server
    /*  const printerSpecs: PrinterSpec = {
        type: ["bw"],
        functional: ["single", "double", "scan"],
    }; */

    useEffect(() => {
        // fetch printer details
        // setPrinterSpecs(printerSpecs);
        /* getPrinterSpec(printerId).then((res) => {
            setPrinterSpecs(res.info);
        }); */
        setPrinterSpecs({
            type: ["bw"],
            functional: ["single", "double", "scan"],
        });
    }, []);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
        setValue,
    } = useForm<UploadData>({
        resolver: zodResolver(uploadSchema),
        defaultValues: {
            size: "A4",
            functional: "single",
            type: "bw",
            pageRange: "all",
            copies: 1,
        },
    });

    const watchedValues = watch();

    const onDrop = async (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setIsDropped(true);
            const file = acceptedFiles[0];

            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            const fileList = dataTransfer.files;

            // Set the value using the proper FileList object
            setValue("file", fileList);
            setFileError(null);
            setFileName(file.name);
            const fileType = file.name.split(".").pop()?.toLowerCase();
            if (pdfjs && fileType === "pdf") {
                setIsPDF(true);
                const count = await calculatePageCount(pdfjs, file);
                setPageCount(count);
            } else {
                setIsPDF(false);
            }
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [".docx"],
        },
        maxFiles: 1,
    });

    useEffect(() => {
        if (pageCount) {
            let pages = pageCount;
            if (
                watchedValues.pageRange === "range" &&
                watchedValues.rangeValue
            ) {
                const ranges = watchedValues.rangeValue
                    .split(",")
                    .map((range) => range.trim());
                pages = ranges.reduce((total, range) => {
                    const [start, end] = range.split("-").map(Number);
                    return total + (end - start + 1);
                }, 0);
            }
            if (watchedValues.functional === "double") {
                pages = Math.ceil(pages / 2);
            }
            console.log("pages");
            setExpectedPages(pages * watchedValues.copies);
        }
    }, [pageCount, watchedValues]);

    const handleExpectedPagesOnChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.preventDefault();
        console.log(e.target.value);
        if (e.target.value === "") {
            setPageCount(null);
            setExpectedPages(null);
            return;
        }
        {
            setPageCount(Number(e.target.value));
            setFileError(null);
        }
    };

    const onSubmit = async (data: UploadData) => {
        if (!data.file || data.file.length === 0) {
            setFileError("Vui lòng chọn file cần in.");
            return;
        }

        if (expectedPages && expectedPages > pageLeft[selectedSize]) {
            setFileError(
                `Số trang cần in vượt quá số lượng giấy còn lại (chỉ còn ${pageLeft[selectedSize]} tờ ${selectedSize}).`
            );
            return;
        }

        if (!isPDF && typeof expectedPages !== "number") {
            console.log("Hello");
            setFileError("Vui lòng nhập số trang cần in.");
            return;
        }

        setFileError(null);

        const file = data.file[0];
        await uploadFileToCDN(file).then((res) => {
            if ("error" in res) {
                toast({
                    title: "Thất bại",
                    description: "Có lỗi xảy ra, vui lòng thử lại",
                    variant: "destructive",
                });
            } else {
                console.log("File uploaded", res.message);
                toast({
                    title: "Thành công",
                    description: "Đã đặt đơn in thành công",
                    variant: "default",
                    className: "bg-green-500 text-white border-none",
                });
                const order: PrintingOrder = {
                    printerId: printerId,
                    fileName: file.name,
                    byStudent: studentInfo.studentId,
                    specifications: {
                        pages:
                            data.pageRange === "all" ? "all" : data.rangeValue!,
                        size: data.size,
                        functional: data.functional,
                        type: data.type,
                        copies: data.copies,
                        additionalInfo: data.additionalInfo,
                    },
                    totalPages: expectedPages!,
                    fileId: res.message,
                };

                console.log("Submitted order:", order);
                // const orderId = await createOrder(order)
                // router.push(`/success/${orderId}`);
            }
        });
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Chọn file và chỉnh sửa</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div
                                {...getRootProps()}
                                className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer">
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <p>Hãy chọn file cần in</p>
                                ) : (
                                    <p>Kéo thả hoặc nhấn để chọn file cần in</p>
                                )}
                                <p className="text-sm text-muted-foreground mt-2">
                                    Các file được phép:{" "}
                                    {allowFileTypes.join(", ")}
                                </p>
                            </div>
                            {fileName && (
                                <p className="mt-2 text-sm text-muted-foreground">
                                    File đã chọn: {fileName}
                                </p>
                            )}

                            {isDropped &&
                                (isPDF ? (
                                    pageCount && (
                                        <p className="mt-2">
                                            Số trang: {pageCount}
                                        </p>
                                    )
                                ) : (
                                    <div className="w-full flex flex-col justify-start items-start space-y-2 pt-2">
                                        <p>Nhập tổng số trang của file:</p>
                                        <Input
                                            type="number"
                                            onChange={
                                                handleExpectedPagesOnChange
                                            }
                                        />
                                    </div>
                                ))}
                        </div>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="size">Chọn cỡ giấy</Label>
                                <Controller
                                    name="size"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                setSelectedSize(
                                                    value as "A4" | "A3"
                                                );
                                            }}
                                            defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="A3">
                                                    A3
                                                </SelectItem>
                                                <SelectItem value="A4">
                                                    A4
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div>
                                <Label htmlFor="functional">Loại in</Label>
                                <Controller
                                    name="functional"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select functional" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="single">
                                                    Một mặt
                                                </SelectItem>
                                                <SelectItem value="double">
                                                    Hai mặt
                                                </SelectItem>
                                                <SelectItem value="scan">
                                                    Scan
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div>
                                <Label htmlFor="type">Màu</Label>
                                <Controller
                                    name="type"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="bw">
                                                    Trắng đen
                                                </SelectItem>
                                                <SelectItem value="color">
                                                    Màu
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="pageRange">Trang cần in</Label>
                        <Controller
                            name="pageRange"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn khoảng" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            Tất cả
                                        </SelectItem>
                                        <SelectItem value="range">
                                            Khoảng bất kì
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {watchedValues.pageRange === "range" && (
                            <div className="mt-2">
                                <Input
                                    {...register("rangeValue")}
                                    placeholder="VD: 1-5, 7-9"
                                />
                                {errors.rangeValue && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.rangeValue.message}
                                    </p>
                                )}
                                <p className="text-sm text-muted-foreground mt-1">
                                    Định dạng: 1-5 (khoảng liên tiếp) or 1-5,
                                    7-10, 12-28 (khoảng rời rạc)
                                </p>
                            </div>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="copies">Số bản in</Label>
                        <Input
                            type="number"
                            {...register("copies", { valueAsNumber: true })}
                        />
                        {errors.copies && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.copies.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="additionalInfo">Thông tin thêm</Label>
                        <Textarea {...register("additionalInfo")} />
                    </div>
                    {expectedPages !== null && (
                        <>
                            <p className="text-sm text-muted-foreground">
                                Số lượng giấy còn lại cho {selectedSize}:{" "}
                                {pageLeft[selectedSize]}
                            </p>
                            <p
                                className={`font-semibold ${
                                    expectedPages > pageLeft[selectedSize]
                                        ? "text-red-500"
                                        : ""
                                }`}>
                                Số lượng giấy cần in: {expectedPages}
                            </p>
                        </>
                    )}
                    {isDropped && fileError && (
                        <p className="text-red-500 text-sm mt-2">{fileError}</p>
                    )}
                </form>
            </CardContent>
            <CardFooter className="w-full flex justify-between items-center space-x-4">
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        router.push("/buy-paper");
                    }}
                    className="w-full bg-main hover:bg-[#030391]/90">
                    Mua thêm giấy
                </Button>
                <Button
                    onClick={handleSubmit(onSubmit)}
                    className="w-full bg-main hover:bg-[#030391]/90">
                    Đặt đơn in
                </Button>
            </CardFooter>
        </Card>
    );
}
