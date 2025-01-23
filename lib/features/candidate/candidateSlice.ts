import { createSlice } from '@reduxjs/toolkit';
import updateWholeObjectInState from "@/utils/updateWholeObjectInState";

export const candidateSlice = createSlice({
    name: 'candidate',
    initialState: {
        id: "",
        profilePicture: {
            file: {
                name: "",
                data: "",
                contentType: "",
            },
        },
        name: "",
        surname: "",
        contact: {
            address: "",
            city: "",
            zipCode: "",
            country: "",
            email: "",
            phoneNumber: "",
            linkedIn: "",
        },
        curriculumVitae: {
            file: {
                name: "",
                data: "",
                contentType: "",
            },
        },
        status: {
            archived: false,
            employed: false,
            rejected: false,
        },
    },
    reducers: {
        loadUpdateCandidate: (state, action) => {
            return updateWholeObjectInState(state, action.payload);
        },
    }
})

export const { loadUpdateCandidate } = candidateSlice.actions;
export default candidateSlice.reducer;