import { createSlice } from '@reduxjs/toolkit';
import updateWholeObjectInState from "@/utils/updateWholeObjectInState";

export const initialStateHrUser = {
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
    username: "",
}

export const hrUserSlice = createSlice({
    name: 'hrUser',
    initialState: initialStateHrUser,
    reducers: {
        loadUpdateHrUser: (state, action) => {
            return updateWholeObjectInState(state, action.payload);
        }

    }
})

export const { loadUpdateHrUser } = hrUserSlice.actions;
export default hrUserSlice.reducer;