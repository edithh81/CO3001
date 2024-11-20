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
    id: number;
    room: string;
    queue: number;
    info: {
        model: string;
        type: string;
        functional: string;
    };
};
