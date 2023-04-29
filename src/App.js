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
                {/*<Route path="*" element={<PageNotFound />} />*/}
            </Routes>
           <CalendarMaster/>
       </SnackbarProvider>
   </Fragment>
  );
}

export default App;
