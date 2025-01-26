import mongoose from 'mongoose';

export interface IEmailTemplateSchema {
    id: string;
    emailType: string;
    emailText: string;
}

const { Schema } = mongoose;

const emailTemplateSchema = new Schema<IEmailTemplateSchema>({
    id: {
        type: String,
        unique: true,
    },
    emailType: String,
    emailText: String
})

export default emailTemplateSchema;