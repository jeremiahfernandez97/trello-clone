import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todos",
    initialState: [],
    reducers: {
        addTodo: (state, PayloadAction) => {
            const newTodo = {
                id: Date.now(),
                title: PayloadAction.payload.title,
                status: "in queue",
                order: PayloadAction.payload.order,
            };
            state.push(newTodo);

            // console.log(current(state));

            // let newState = [{
            //     completed: false,
            //     id: 1,
            //     title: "test1"
            // },
            // {
            //     completed: false,
            //     id: 2,
            //     title: "test2"
            // },
            // {
            //     completed: false,
            //     id: 3,
            //     title: "test3"
            // }]

            // newState.forEach((item) => {
            //     state.push(item);
            // })

            // console.log(current(state));
        },

        updateTodo: (state, PayloadAction) => {            
            state.map((todo) =>
                PayloadAction.payload.id === todo.id? todo.title = PayloadAction.payload.title : todo
            );
        },

        deleteTodo: (state, PayloadAction) => {
            return state.filter((todo) => todo.id !== PayloadAction.payload.id);
        },

        changeStatusInProgress: (state, PayloadAction) => {
            state.map((todo) => {
                    if (PayloadAction.payload.id !== todo.id && PayloadAction.payload.previousOrder < todo.order && PayloadAction.payload.previousStatus === todo.status) {
                        todo.order = todo.order - 1
                    }

                    if (PayloadAction.payload.id === todo.id) {
                        todo.status = "in progress";
                        todo.order = PayloadAction.payload.currentOrder
                    }
                }
            );
        },

        changeStatusInQueue: (state, PayloadAction) => {
            state.map((todo) => {
                    if (PayloadAction.payload.id !== todo.id && PayloadAction.payload.previousOrder < todo.order && PayloadAction.payload.previousStatus === todo.status) {
                        todo.order = todo.order - 1
                    }

                    if (PayloadAction.payload.id === todo.id) {
                        todo.status = "in queue";
                        todo.order = PayloadAction.payload.currentOrder
                    }
                }
            );
        },

        changeStatusCompleted: (state, PayloadAction) => {
            state.map((todo) => {
                    if (PayloadAction.payload.id !== todo.id && PayloadAction.payload.previousOrder < todo.order && PayloadAction.payload.previousStatus === todo.status) {
                        todo.order = todo.order - 1
                    }

                    if (PayloadAction.payload.id === todo.id) {
                        todo.status = "completed";
                        todo.order = PayloadAction.payload.currentOrder
                    }
                }
            );
        }
    },
})

export const { addTodo, updateTodo, deleteTodo, changeStatusInProgress, changeStatusInQueue, changeStatusCompleted  } = todoSlice.actions;
export default todoSlice.reducer;
