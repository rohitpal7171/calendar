import {Box, CircularProgress, Typography} from "@mui/material";

function LoaderComponent(){
    return(
        <Box sx={{ display: 'flex', justifyContent:'center',alignItems:'center' }}>
            <CircularProgress />&emsp;
            <Typography>Please wait for a moment...</Typography>
        </Box>
    )
}
export default LoaderComponent
