import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { printerDetail } from "@/types";

interface PrinterCardProps {
    printer: printerDetail;
    onSelect: () => void;
}

export default function AdminPrinterCard({
    printer,
    onSelect,
}: PrinterCardProps) {
    return (
        <Card className="bg-white border border-black ">
            <CardHeader>
                <CardTitle className="font-bold text-xl">
                    Máy in số {printer.id}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-black">
                    <p>Phòng: {printer.room}</p>
                    <p>Số đơn in đang đợi: {printer.queue}</p>
                    <Badge
                        className={`${
                            printer.status === "working"
                                ? "bg-green-500"
                                : "bg-red-500"
                        }`}
                        variant={
                            printer.status === "working"
                                ? "default"
                                : "destructive"
                        }>
                        {printer.status === "working" ? "Hoạt động" : "Bảo trì"}
                    </Badge>
                </CardDescription>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={onSelect}
                    className="bg-main hover:bg-[#030391]">
                    Xem chi tiết
                </Button>
            </CardFooter>
        </Card>
    );
}
