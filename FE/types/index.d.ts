export type Credentials = {
    username: string;
    password: string;
} & { [key: string]: any };

export type StudentResponse = {
    studentId: string;
    name: string;
    avatar: string;
};
