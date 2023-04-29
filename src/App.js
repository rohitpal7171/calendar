import {Fragment} from "react";
import CalendarMaster from "./Components/CalendarMaster";
import { Routes, Route} from "react-router-dom";
import CalendarAdd from "./Components/CalendarAdd";
import {SnackbarProvider} from "notistack";
import CalendarDetail from "./Components/CalendarDetail";

function App() {
  return (
   <Fragment>
       <SnackbarProvider maxSnack={3}>
            <Routes>
                <Route path="/add-event" element={<CalendarAdd/>} />
                <Route path="event-view/:id" element={<CalendarDetail />}/>
                <Route path="event-view/:id/edit" element={<CalendarAdd type={'update'}/>} />
            </Routes>
           {/*Placed here to keep this module in base location */}
           <CalendarMaster/>
       </SnackbarProvider>
   </Fragment>
  );
}

export default App;
