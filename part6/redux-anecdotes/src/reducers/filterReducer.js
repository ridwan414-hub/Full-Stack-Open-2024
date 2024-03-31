import { createSlice } from "@reduxjs/toolkit"


const filterSlice = createSlice({
    name: 'filter',
    initialState: null,
    reducers: {
        filterChange(state, action) {
            if (action.payload !== null) {
                return action.payload
            } else {
                return state
            }
        }
    }

})
export const { filterChange } = filterSlice.actions
export default filterSlice.reducer