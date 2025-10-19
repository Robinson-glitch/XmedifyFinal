import { Typography } from "@mui/material";
import { Button, CircularProgress, Stack, TextField} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { use, useEffect, useState } from "react";
import hospitalicon from '../assets/hospitalicon.jpg';
import logo from '../assets/logo.jpg';
import { useLocation } from 'react-router-dom';
import "./MyBookings.css"

const MyBookings=()=>{
    // const location = useLocation();
    // const {['Hospital Name']:hospital,bookingDate, bookingTime} = location.state||{};
     const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    
      const storedData = JSON.parse(localStorage.getItem("bookings"));
      setAppointmentData(storedData);
  
  }, []);


    // console.log("appointmentdata",Appointmentdata);
    return(
<Box>
{appointmentData?(
<Box>
<h1>My Bookings</h1>

<Box>
<Box className="Hospitalinfo" sx={{display:"flex"}}>
          <Box className="HospitalIcon" sx={{width:"140px",height:"140px"}}>
            <img style={{width:"100%",height:"100%"}} src={hospitalicon}></img>
          </Box>
          <Box className="Address">
            <Box className="HospitalName"><h3>{appointmentData["Hospital Name"]}</h3></Box>
        <Box sx={{width:"307px",height:"85px",mt:"12px",ml:"16px"}}><h1>{appointmentData.city},{appointmentData.state}</h1> </Box>
        </Box>
        <Box sx={{width:"236px",height:"220px"}}>
        <Box sx={{width:"114px",height:"20px",color:"#01A400", mb:"11px"}}>Available Today</Box>
     <Box>{appointmentData.bookingDate}</Box>
     <Box>{appointmentData.bookingTime}</Box>
        </Box>
       </Box>
</Box>
</Box>):<Typography variant="h6" sx={{ mt: 2 }}>No bookings found.</Typography>})
</Box>
    )
}

export default MyBookings;