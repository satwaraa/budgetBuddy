import { createSlice } from "@reduxjs/toolkit";
interface StateInterface {
    userName: string | null;
    email: null;
}
const initialState: StateInterface = {
    userName: null,
    email: null,
};
const userInformation = createSlice({
    name: "current_user",
    initialState,
    reducers: {
        setCredentials: (
            state: StateInterface,
            action: { payload: Pick<StateInterface, "email" | "userName"> },
        ) => {
            const { userName, email } = action.payload;
            state.userName = userName;
            state.email = email;
        },
    },
});

export const { setCredentials } = userInformation.actions;

export default userInformation.reducer;

export const selectCurrentUser = (state: any) => state.userInformation.userName;
export const selectCurrentEmail = (state: any) => state.userInformation.email;
