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
import { FileIcon, Download } from "lucide-react";
import { PrintingOrder } from "@/types";

export default function PrintingOrderViewCard({
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
}: PrintingOrder) {
    const router = useRouter();

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span className="text-2xl">Đơn số: {orderId || "N/A"}</span>
                    <div className="flex flex-col justify-start items-start space-y-4">
                        <Badge variant="outline" className="text-2xl">
                            {specifications.size}
                        </Badge>
                        <Badge
                            variant={
                                status === "completed"
                                    ? "default"
                                    : status === "pending"
                                    ? "secondary"
                                    : "destructive"
                            }
                            className="text-sm">
                            {status === "pending"
                                ? "Đang chờ"
                                : status === "completed"
                                ? "Đã hoàn thành"
                                : "Đã hủy"}
                        </Badge>
                    </div>
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
            </CardContent>
        </Card>
    );
}
