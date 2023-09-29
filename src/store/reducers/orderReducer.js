import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        isRequesting: false,
        list: [],
        dateParams: [
            "2022-12-31T18:30:00.000Z",
            "2023-09-29T17:38:44.695Z"
        ]
    },
    reducers: {
        setRequesting: (state) => {
            state.isRequesting = true;
            state.list = [];
        },
        setOrders: (state, action) => {
            const payload = action.payload;
            const orderList = payload ? payload : [];

            state.list = orderList;
            state.isRequesting = false;
        },
        updateDateParams: (state, action) => {
            const defaultParams = [
                "2022-12-31T18:30:00.000Z",
                "2023-09-29T17:38:44.695Z"
            ];

            const payload = action.payload ? action.payload : defaultParams;
            let [start, end] = payload;
            start = start ? start : end ? end : defaultParams[0];
            end = end ? end : start ? start : defaultParams[1];

            state.dateParams = [start, end];
        },
    },
});

export const { setRequesting, setOrders, updateDateParams } = orderSlice.actions;
export default orderSlice.reducer;
