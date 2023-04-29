import {Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {calendarActions} from "../store/calendarSlice";
import {categoryColor} from "../utils/eventCategory";

function CalendarFilterSection () {
    const dispatch = useDispatch()
    const {categoryFilter} = useSelector(state => state.calendar)
    const handleChange =(event)=>{
        dispatch(calendarActions.changeCategoryFilter(event.target.value))
    }

    return(
        <Box style={{borderRight:'1px solid lightGrey',height:'100%',marginRight:'20px'}}>
            <FormControl component="fieldset">
                <FormLabel component="legend">
                    {' '}
                    <Typography variant={'subtitle1'}>
                       Select Category
                    </Typography>
                </FormLabel>
                <RadioGroup
                    aria-label="categoryFilterGroup"
                    name="categoryFilterGroup"
                    value={categoryFilter}
                    onChange={handleChange}
                >
                    <FormControlLabel
                        value="all"
                        control={<Radio/>}
                        label={'All' }
                    />
                    <FormControlLabel
                        value="work"
                        control={<Radio style={{ color: categoryColor.work }} />}
                        label={'Work'}
                    />
                    <FormControlLabel
                        value="personal"
                        control={<Radio style={{ color:categoryColor.personal }} />}
                        label={'Personal'}
                    />
                    <FormControlLabel
                        value="social"
                        control={<Radio style={{ color: categoryColor.social }} />}
                        label={'Social'}
                    />
                    <FormControlLabel
                        value="others"
                        control={<Radio style={{ color:categoryColor.others }} />}
                        label={'Others'}
                    />

                </RadioGroup>
            </FormControl>
        </Box>
    )
}

export default CalendarFilterSection
