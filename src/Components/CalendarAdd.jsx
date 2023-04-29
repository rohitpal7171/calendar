import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {calendarActions} from "../store/calendarSlice";
import {Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {categoryColor, eventCategory} from "../utils/eventCategory";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useFormik} from "formik";
import dayjs from "dayjs";
import {eventInitialValues} from "../utils/eventInitialValues";
import {eventvalidation} from "../utils/eventvalidation";
import moment from "moment";
import {useSnackbar} from "notistack";
import {useState} from "react";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

function CalendarAdd() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams()
    const { enqueueSnackbar } = useSnackbar();
    const {allEvents,dateClicked} = useSelector(state => state.calendar)
    const [open,setOpen] = useState(true)

    // This id check needed because we are using this component for event add as well as event update.
    const eventToBeUpdate = id ? allEvents.find(item => String(item.id) === window.atob(id)) || {} : {}
    const handleClose = () => {
        setOpen(false)
        navigate(-1)
    };

    const modifiedInitialValues ={
        ...eventInitialValues,
        start: dateClicked,
        end : dateClicked
    }

    const {values,setFieldValue,errors,touched,handleBlur,handleChange,handleSubmit} = useFormik({
        initialValues: !id ? modifiedInitialValues: eventToBeUpdate,
        validationSchema: eventvalidation,

        onSubmit: (values,actions) => {
            const tempObject = {
                ...values,
                color : categoryColor[values.category],
                id : !id? allEvents.length+1 : eventToBeUpdate.id,
            }
            if(!id){
                dispatch(calendarActions.addEvents([...allEvents,tempObject]))
            }else{
                const restEvents = allEvents.filter(item => String(item.id) !== window.atob(id))
                dispatch(calendarActions.addEvents([...restEvents,tempObject]))
                dispatch(calendarActions.getSingleEvent(tempObject))
            }
            handleClose()
            enqueueSnackbar(!id ?'Event created successfully!': 'Event updated successfully!', { variant:'success' });
        }
    })

    return (
        <div>
            <BootstrapDialog
                fullWidth={true}
                maxWidth={'sm'}
                onClose={handleClose}
                disableEnforceFocus={false}
                aria-labelledby="customized-dialog-title"
                TransitionProps={{role: 'presentation'}}
                open={open}
            >
                <form onSubmit={handleSubmit}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Create Event
                </BootstrapDialogTitle>
                <DialogContent>
                    <Box p={2}>
                            <Grid container spacing={2}>
                                <Grid item sm={6}>
                                    <TextField
                                        fullWidth
                                        label={'Event Title'}
                                        variant={'outlined'}
                                        name={'title'}
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.title && touched.title}
                                    />
                                    {errors.title && touched.title?(
                                        <p style={{color:'red',marginTop:'5px'}}>{errors.title}</p>
                                    ):null}
                                </Grid>
                                <Grid item sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name={'category'}
                                            label="Category"
                                            value={values.category}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            {Object.keys(eventCategory).map(item => (
                                                <MenuItem value={item}>{item}</MenuItem>
                                            ))}
                                        </Select>
                                        {errors.category && touched.category?(
                                            <p className={'form-error'}>{errors.category}</p>
                                        ):null}
                                    </FormControl>
                                </Grid>
                                <Grid item sm={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer
                                            components={[
                                                'MobileDateTimePicker',
                                            ]}
                                        >
                                            <DateTimePicker
                                                formatDensity={'dense'}
                                                label="Start Date"
                                                name={'start'}
                                                value={dayjs(values.start)}
                                                onChange={(newValue)=> {
                                                    let date = newValue.$d
                                                    setFieldValue('start',moment(date).format('YYYY-MM-DDTHH:MM'),true)
                                                }}
                                                onBlur={handleBlur}
                                                format={'LLL'}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    {errors.start && touched.start?(
                                        <p className={'form-error'}>{errors.start}</p>
                                    ):null}
                                </Grid>
                                <Grid item sm={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer
                                            components={[
                                                'MobileDateTimePicker',
                                            ]}
                                        >
                                            <DateTimePicker
                                                formatDensity={'dense'}
                                                label="End Date"
                                                name={'end'}
                                                value={dayjs(values.end)}
                                                onChange={(newValue)=> {
                                                    let date = newValue.$d
                                                    setFieldValue('end',moment(date).format('YYYY-MM-DDTHH:MM'),true)
                                                }}
                                                onBlur={handleBlur}
                                                format={'LLL'}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    {errors.end && touched.end?(
                                        <p className={'form-error'}>{errors.end}</p>
                                    ):null}
                                </Grid>
                            </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button type={'submit'}>
                        Save
                    </Button>
                </DialogActions>
            </form>
            </BootstrapDialog>
        </div>
    );
}

export default CalendarAdd
