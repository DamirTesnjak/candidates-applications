import mongoose from 'mongoose';

export interface ICompanyEmailSettingsSchema {
    id: string;
    emailHost: string;
    port: number;
    email: string;
    username: string;
    companyName: string;
    password: string;
}

const { Schema } = mongoose;

const companyEmailSettingsSchema = new Schema<ICompanyEmailSettingsSchema>({
    id: {
        type: String,
        unique: true,
    },
    emailHost: String,
    port: Number,
    email: String,
    username: String,
    companyName: String,
    password: String,
})

export default companyEmailSettingsSchema;