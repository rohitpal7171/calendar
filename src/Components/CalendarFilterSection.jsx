import {
    Box,
    FormControl,
    MenuItem,
    Select,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {calendarActions} from "../store/calendarSlice";
import {categoryColor, eventCategory} from "../utils/eventCategory";
import Button from "@mui/material/Button";
import {RestartAltOutlined} from "@mui/icons-material";

function CalendarFilterSection() {
    const {breakpoints} = useTheme()
    const mobileView = useMediaQuery(breakpoints.down('sm'))
    const dispatch = useDispatch()
    const {categoryFilter} = useSelector(state => state.calendar)
    const handleChange = (event) => {
        dispatch(calendarActions.changeCategoryFilter(event.target.value))
    }
    const handleReset = () => {
        dispatch(calendarActions.changeCategoryFilter('all'))
    }

    return (
        <Box py={1} mb={1} display={'flex'} alignItems={'center'} justifyContent={'space-between'}
             sx={{
                 borderBottom: '1px solid lightGrey',
                 '& button': {p: 1}}}>
            {!mobileView && <Box>
                <Typography variant={'h6'} color={''}>Lets learn more about Calendar</Typography>
            </Box>}
            <Box display={'flex'} alignItems={'center'}>
            <Typography variant={'subtitle1'} color={'textSecondary'}>Category:</Typography>&emsp;
            <FormControl size={'small'} sx={{width: 110}}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryFilter}
                    onChange={handleChange}
                >
                    <MenuItem value={'all'}>All</MenuItem>
                    {Object.keys(eventCategory).map(item => (
                        <MenuItem value={item}>
                            <Typography sx={{color: categoryColor[item]}}>{item}</Typography>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>&emsp;
            <Button
                startIcon={<RestartAltOutlined/>}
                onClick={handleReset}
                variant={'contained'}
                disableElevation
                size={'small'}
                disabled={categoryFilter==='all'}
                sx={{backgroundColor: 'deepskyblue', textTransform: 'inherit'}}
            >
                Reset
            </Button>
            </Box>
        </Box>
    )
}

export default CalendarFilterSection
