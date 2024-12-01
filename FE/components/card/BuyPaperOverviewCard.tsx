"use client";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { BuyPaperOrder } from "@/types";

function isValidDate(dateString: string): boolean {
    return !isNaN(Date.parse(dateString));
}

export default function BuyPaperOrderOverviewCard({
    orderId,
    byStudent = "Unknown",
    A3 = 0,
    A4 = 0,
    total = 0,
    status = "unknown",
    at = new Date().toISOString(),
    method = "Unknown",
}: BuyPaperOrder) {
    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span className="text-2xl">Đơn số: {orderId || "N/A"}</span>
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
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold flex items-center gap-2">
                            MSSV
                        </h3>
                        <p>{byStudent}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold flex items-center gap-2">
                            Thời gian đặt
                        </h3>
                        <p>
                            {isValidDate(at)
                                ? new Date(at).toLocaleString()
                                : "Invalid Date"}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold">Số giấy A3</h3>
                        <p>{A3} tờ</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Số giấy A4</h3>
                        <p>{A4} tờ</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold flex items-center gap-2">
                            Tổng tiền
                        </h3>
                        <p>{formatPrice(total)}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold flex items-center gap-2">
                            Phương thức thanh toán
                        </h3>
                        <p>{method === "cash" ? "Tiền mặt" : "BKPay"}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
