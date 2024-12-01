import { PrintingSpecsFormValues } from "@/lib/validation";

export type Credentials = {
    username: string;
    password: string;
} & { [key: string]: any };

export type StudentResponse = {
    studentId: string;
    name: string;
    avatar: string;
};

export type printLog = {
    time: string;
    printer: string;
    fileName: string;
    size: string;
    pages: number;
};

export type PrinterType = "bw" | "color";
export type PrinterFunctional = "single" | "double" | "scan";
export type PrinterStatus = "working" | "maintenance";
export type CampusId = "cs1" | "cs2";

export type printerDetail = {
    id: number;
    campusId?: CampusId;
    room: string;
    queue?: number;
    status: PrinterStatus;
    info: {
        model: string;
        type: PrinterType[];
        functional: PrinterFunctional[];
    };
};

export type printerDetailCreate = Omit<printerDetail, "id">;

export type PrintingOrder = {
    orderId?: number;
    printerId: number;
    fileName: string;
    byStudent: string;
    fileId: string;
    specifications: {
        pages: string;
        size: string;
        functional: string; //"single" | "double" | "scan"
        type: string; //"bw" | "color"
        additionalInfo?: string;
        copies: number;
    };
    totalPages: number;
    status: string;
    at: string;
    campus: string;
};

export type PrintingOrderTrue = Omit<PrintingOrder, "orderId"> & {
    orderId: number;
};

export type UploadData = Omit<PrintingOrder["specifications"], "pages"> & {
    file: FileList;
    pageRange: "all" | "range";
    rangeValue?: string;
};

export type BuyPaperOrder = {
    orderId?: number;
    byStudent: string;
    A3?: number;
    A4?: number;
    total: number;
    status: string;
    at: string;
    method: string;
};

export type BuyPaperOrderTrue = Omit<BuyPaperOrder, "orderId"> & {
    orderId: number;
};
export type printerDetailCreate = Omit<printerDetail, "id" | "queue">;
export type Student = {
    studentId: string;
    name: string;
    A3: number;
    A4: number;
};

export type PrintingSpecs = Omit<
    PrintingSpecsFormValues,
    "resetStartDate" | "resetEndDate"
> & {
    resetStartDate: string;
    resetEndDate: string;
};

export type Notification = {
    id: number;
    content: string;
    at: string;
};
