import {Fragment} from 'react'
import {Grid} from "@mui/material";
import CalendarView from "./Calendar/CalendarView";
import CalendarFilterSection from "./CalendarFilterSection";

function CalendarMaster() {
    return (
        <Fragment>
            <Grid container sx={{display:'flex',flexDirection:'column'}}>
                {/*Filter Area*/}
                <Grid item sm={12}>
                    <CalendarFilterSection/>
                </Grid>
                {/*Calendar to be shown in this Area only.*/}
                <Grid item sm={12}>
                    <CalendarView/>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default CalendarMaster;
