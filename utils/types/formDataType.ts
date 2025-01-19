import { IFile } from "@/utils/types/fileType";

export interface IFormDataType {
    [x: string]: IFile | string | undefined;
    name?: string;
    surname?: string;
    companyName?: string;
    phoneNumber?: string;
    email?: string;
    username?: string;
    password?: string
}