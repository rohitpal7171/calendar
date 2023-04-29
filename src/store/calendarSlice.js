import {createSlice} from "@reduxjs/toolkit";
import {defaultCalendarEvents} from "../utils/defaultCalendarEvents";
import moment from "moment";

const initialState = {
    allEvents: defaultCalendarEvents,
    categoryFilter: 'all',
    dateClicked : moment().format('YYYY-MM-DDTHH:MM'),
    event: {}
}
export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        addEvents: (state, action) => {
            state.allEvents = action.payload
        },
        changeCategoryFilter: (state, action) => {
            state.categoryFilter = action.payload
        },
        changeDateClicked: (state, action) => {
            state.dateClicked = action.payload
        },
        getSingleEvent :(state, action) => {
            state.event = action.payload
        }
    },
})

export const calendarActions = calendarSlice.actions
