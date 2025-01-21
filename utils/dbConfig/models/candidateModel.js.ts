import mongoose from 'mongoose';

export interface ICandidateSchema {
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
    contact: {
        address: string;
        city: string;
        zipCode: string;
        country: string;
        email: string;
        phoneNumber: string;
        linkedIn: string;
    };
    curriculumVitae: {
        file: {
            name: string;
            data: string;
            contentType: string;
        },
    },
    status: {
        archived: boolean;
        employed: boolean;
        rejected: boolean;
    },
}

const { Schema } = mongoose;

const candidateSchema = new Schema<ICandidateSchema>({
    id: {
        type: String,
        unique: true,
    },
    profilePicture: {
        file: {
            name: String,
            data: String,
            contentType: String,
        },
    },
    name: String,
    surname: String,
    contact: {
        address: String,
        city: String,
        zipCode: String,
        country: String,
        email: String,
        phoneNumber: String,
        linkedIn: String,
    },
    curriculumVitae: {
        file: {
            name: String,
            data: String,
            contentType: String,
        },
    },
    status: {
        archived: Boolean,
        employed: Boolean,
        rejected: Boolean,
    },
})

export default candidateSchema;