import { createSlice } from '@reduxjs/toolkit';
import updateWholeObjectInState from "@/utils/updateWholeObjectInState";

export const hrUserSlice = createSlice({
    name: 'hrUser',
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
        companyName: "",
        phoneNumber: "",
        email: "",
    },
    reducers: {
        loadUpdateHrUser: (state, action) => {
            return updateWholeObjectInState(state, action.payload);
        }

    }
})

export const { loadUpdateHrUser } = hrUserSlice.actions;
export default hrUserSlice.reducer;