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

export type printerDetail = {
    campusId?: number;
    id: number;
    room: string;
    queue: number;
    status?: string;
    info: {
        model: string;
        type: string[]; // "bw" | "color"
        functional: string[]; // "one-side | two-side | scan"
    };
};

export type PrintingOrder = {
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
};

export type UploadData = Omit<PrintingOrder["specifications"], "pages"> & {
    file: FileList;
    pageRange: "all" | "range";
    rangeValue?: string;
};
