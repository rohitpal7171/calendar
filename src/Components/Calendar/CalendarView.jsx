import React from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {Box, useTheme} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate} from "react-router-dom";
import {calendarActions} from "../../store/calendarSlice";
import moment from "moment/moment";
import listPlugin from '@fullcalendar/list';
import './Calendar.css'

function CalendarView() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const theme = useTheme()
    const {allEvents,categoryFilter} = useSelector(state => state.calendar)

    const filteredEvents = categoryFilter === "all" ? allEvents : allEvents.filter(item => item.category === categoryFilter)

    const handleEventAdd = (item) =>{
        dispatch(calendarActions.changeDateClicked(moment(item.startStr).format('YYYY-MM-DDTHH:MM')))
        navigate('add-event')
    }

    const handleEventClick =(clickedEvent)=>{
        navigate(`event-view/${window.btoa(clickedEvent.event.id)}`)
    }

    const dayCellContent =(item)=>{
       return(
           <Box
               display={'flex'}
               justifyContent={'center'}
               alignItems={'center'}
               borderRadius={'20px'}
               height={'22px'}
               width={'22px'}
               bgcolor={item.isToday ? theme.palette.primary.main: 'white'}
               fontWeight={'bold'}
               style={{color: item.isToday? 'white':'black'}}
           >
               {item.dayNumberText}
           </Box>
       )
    }

    return (
        <Box style={{height: '100% !important'}}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}
                initialView='dayGridMonth'
                editable={false}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                nowIndicator={true}
                dayMaxEventRows={2}
                contentHeight={'82vh'}
                events={filteredEvents}
                eventClick={handleEventClick}
                select={handleEventAdd}
                dayCellContent={dayCellContent}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: true
                }}
            />
        </Box>
    )
}

export default CalendarView
