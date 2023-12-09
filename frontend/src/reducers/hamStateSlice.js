import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expanded: false,
}

const hamStateSlice = createSlice({
    name: "hamState",
    initialState,
    reducers: {
        toggleNavbar: (state) => {
            state.expanded = !state.expanded;
        },
        closeNavbar: (state) => {
            state.expanded = false;
        }
    }
})

export const { toggleNavbar, closeNavbar } = hamStateSlice.actions;
export default hamStateSlice.reducer;