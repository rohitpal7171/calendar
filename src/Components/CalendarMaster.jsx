import {Fragment} from 'react'
import {Grid} from "@mui/material";
import CalendarView from "./Calendar/CalendarView";
import CalendarFilterSection from "./CalendarFilterSection";

function CalendarMaster() {
    return (
        <Fragment>
            <Grid container>
                {/*Area to implement Filter or to add any description or feature to represent more about calendar*/}
                <Grid item sm={2}>
                    <CalendarFilterSection/>
                </Grid>
                {/*Calendar to be shown in this Area only.*/}
                <Grid item sm={10}>
                    <CalendarView/>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default CalendarMaster;
