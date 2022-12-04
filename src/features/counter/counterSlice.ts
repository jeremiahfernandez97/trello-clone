import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 20,
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        incremented(state) {
            state.value++;
        },

        addByAmount(state, PayloadAction) {
            state.value = state.value + PayloadAction.payload;
        }
    }
});

export const { incremented, addByAmount } = counterSlice.actions;
export default counterSlice.reducer;