import mongoose from 'mongoose';

export interface IMappedEmailTemplates {
    id: string;
    archive: string;
    hire: string;
    reject: string;
}

const { Schema } = mongoose;
const mappedEmailTemplates = new Schema<IMappedEmailTemplates>({
    id: String,
    archive: String,
    hire: String,
    reject: String,
})

export default mappedEmailTemplates;