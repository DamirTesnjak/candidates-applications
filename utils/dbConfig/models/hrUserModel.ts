import mongoose from 'mongoose';

export interface IHrUserSchema {
    id: string;
    profilePicture: {
        file: {
            name: string;
            data: string;
            contentType: string;
        };
    };
    name: string;
    surname: string;
    companyName: string;
    phoneNumber: string;
    email: string;
    username: string;
    password: string;
    isVerified: boolean;
    isAdmin: boolean;
    active: boolean;
    forgotPasswordToken: string;
    forgotPasswordTokenExpiry: Date;
    verifyToken: string;
    verifyTokenExpiry: Date;

}

const { Schema } = mongoose;
const hrUserSchema = new Schema<IHrUserSchema>({
    id: String,
    profilePicture: {
        file: {
            name: String,
            data: String,
            contentType: String,
        },
    },
    name: {
        type: String,
        unique: true,
    },
    surname: {
        type: String,
        unique: true,
    },
    companyName: String,
    phoneNumber: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        unique: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    active: Boolean,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

export default hrUserSchema;