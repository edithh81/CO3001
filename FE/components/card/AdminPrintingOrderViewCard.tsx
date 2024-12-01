"use client";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileIcon, Download, CheckCircle, XCircle } from "lucide-react";
import { PrintingOrder } from "@/types";
import { useState } from "react";

interface PrintingOrderProps extends PrintingOrder {
    onComplete: (comment: string) => void;
    onReject: (comment: string) => void;
}

export default function AdminPrintingOrderViewCard({
    orderId,
    printerId,
    fileName,
    byStudent,
    fileId,
    specifications,
    totalPages,
    status,
    at,
    campus,
    onComplete,
    onReject,
}: PrintingOrderProps) {
    const router = useRouter();
    const [comment, setComment] = useState("");
    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    return (
        <Card className="w-full max-w-7xl">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span className="text-2xl">Đơn số: {orderId || "N/A"}</span>
                    <Badge variant="outline" className="text-2xl">
                        {specifications.size}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold">Sinh viên</h3>
                        <p>{byStudent}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Mã máy in</h3>
                        <p>{printerId}</p>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">File</h3>
                    <div className="flex items-center space-x-2">
                        <div className="flex-1 flex items-center space-x-2 bg-muted p-2 rounded-md">
                            <FileIcon className="text-muted-foreground" />
                            <span className="flex-1 truncate">{fileName}</span>
                            <Badge variant="secondary">
                                {fileId.split(".").pop()?.toLowerCase()}
                            </Badge>
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                                router.push(
                                    `${process.env.NEXT_PUBLIC_FILE_DOWNLOAD_API_URL}/${fileId}`
                                )
                            }>
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold">Loại in</h3>
                        <p>
                            {specifications.functional === "single"
                                ? "Một mặt"
                                : specifications.functional === "double"
                                ? "Hai mặt"
                                : "Scan"}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Màu</h3>
                        <p>
                            {specifications.type === "bw" ? "Trắng đen" : "Màu"}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold">Các trang cần in</h3>
                        <p>
                            {specifications.pages === "all"
                                ? "Tất cả"
                                : specifications.pages}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Số bản in</h3>
                        <p>{specifications.copies}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold">Tổng số trang cần in</h3>
                        <p>{totalPages}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Trạng thái</h3>
                        <p>
                            {status === "pending"
                                ? "Đang chờ"
                                : status === "completed"
                                ? "Đã hoàn thành"
                                : "Đã bị huỷ"}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold">Ngày đặt in</h3>
                        <p>{new Date(at).toLocaleString()}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Cơ sở</h3>
                        <p>{campus === "cs1" ? "Lý Thường Kiệt" : "Dĩ An"}</p>
                    </div>
                </div>
                {specifications.additionalInfo && (
                    <div>
                        <h3 className="font-semibold">Thông tin thêm</h3>
                        <p>{specifications.additionalInfo}</p>
                    </div>
                )}
                <div>
                    <h3 className="font-semibold mb-2">Nhận xét của admin</h3>
                    <Textarea
                        placeholder="Thêm nhận xét ở đây..."
                        onChange={handleCommentChange}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
                <Button
                    variant="outline"
                    onClick={() => onReject(comment)}
                    className="bg-red-500 hover:bg-red-500/90">
                    <XCircle className="mr-2 h-4 w-4" />
                    Từ chối
                </Button>
                <Button
                    onClick={() => onComplete(comment)}
                    className="bg-main hover:bg-main">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Hoàn thành
                </Button>
            </CardFooter>
        </Card>
    );
}
