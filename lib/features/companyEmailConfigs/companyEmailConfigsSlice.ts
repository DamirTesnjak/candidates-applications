import { createSlice } from '@reduxjs/toolkit';
import updateWholeObjectInState from "@/utils/updateWholeObjectInState";

export const initialStateCompanyEmailConfigs = {
  id: "",
  emailHost: "",
  port: "",
  email: "",
  username: "",
  companyName: "",
  password: "",
}

export const companyEmailConfigsSlice = createSlice({
  name: 'companyEmailConfigs',
  initialState: initialStateCompanyEmailConfigs,
  reducers: {
    loadUpdateCompanyEmailConfigs: (state, action) => {
      return updateWholeObjectInState(state, action.payload);
    },
  }
})

export const { loadUpdateCompanyEmailConfigs } = companyEmailConfigsSlice.actions;
export default companyEmailConfigsSlice.reducer;