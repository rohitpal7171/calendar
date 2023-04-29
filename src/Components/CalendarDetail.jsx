import {forwardRef, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {useNavigate, useParams} from "react-router-dom";
import {Box, Divider, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {calendarActions} from "../store/calendarSlice";
import LoaderComponent from "../widgets/LoaderComponent";
import IconButton from "@mui/material/IconButton";
import {AccessTimeOutlined, CategoryOutlined, CloseOutlined, TaskAltOutlined} from "@mui/icons-material";
import moment from 'moment';
import {useSnackbar} from "notistack";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CalendarDetail() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams()
    const [open, setOpen] = useState(true);
    const [loading,setLoading] = useState(true)
    const {events,event} = useSelector(state => state.calendar)
    const { enqueueSnackbar } = useSnackbar();

    useEffect(()=>{
        const event = events.find(item => String(item.id )===String(window.atob(id)))
        dispatch(calendarActions.getSingleEvent(event))
        return()=>{
            dispatch(calendarActions.getSingleEvent({}))
        }
    },[id,dispatch])

    useEffect(()=>{
        if(event.id) setLoading(false)
        else setLoading(true)
    },[event.id])
    const handleClose = () => {
        setOpen(false);
        navigate('../')
    };

    const handleEdit = () =>{
        navigate(`edit`)
    }

    const handleDelete = () =>{
        const restEvents = events.filter(item => String(item.id)!== String(event.id))
        dispatch(calendarActions.addEvents(restEvents))
        enqueueSnackbar('Event deleted successfully!', { variant:'success' });
        navigate('../')
    }

    return (
            <Dialog
                open={open}
                fullWidth
                maxWidth={'sm'}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography variant={'subtitle1'}>{event.title}</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseOutlined/>
                        </IconButton>
                    </Box>
                    <Divider/>
                    </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {
                            loading ? <LoaderComponent/>:(
                                <List dense disablePadding>
                                    <ListItem>
                                        <ListItemIcon>
                                            <AccessTimeOutlined color={'primary'}/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            {moment(event.start).format('LLL')} &emsp; ( Start time )
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <TaskAltOutlined color={'primary'}/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            {moment(event.end).format('LLL')} &emsp; ( End time )
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CategoryOutlined color={'primary'}/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            {event.category}
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            )
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{display:"flex",justifyContent:'space-between'}}>
                    <Button variant={'outlined'} onClick={handleEdit}>Edit</Button>
                    <Button variant={'outlined'} onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
    );
}
