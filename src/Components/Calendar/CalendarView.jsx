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

function CalendarView() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const theme = useTheme()
    const {events} = useSelector(state => state.calendar)

    const handleEventAdd = (item) =>{
        dispatch(calendarActions.changeDateClicked(moment(item.startStr).format('YYYY-MM-DDTHH:MM')))
        dispatch(calendarActions.changeAddFormState(true))
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
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView='dayGridMonth'
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                nowIndicator={true}
                dayMaxEventRows={3}
                contentHeight={'90vh'}
                events={events}
                eventClick={handleEventClick}
                select={handleEventAdd}
                dayCellContent={dayCellContent}
            />
        </Box>
    )
}

export default CalendarView
