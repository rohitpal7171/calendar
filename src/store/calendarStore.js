import {configureStore} from "@reduxjs/toolkit";
import {calendarSlice} from "./calendarSlice";

const calendarStore = configureStore({
    reducer:{
        calendar: calendarSlice.reducer
    }
})
export default calendarStore
