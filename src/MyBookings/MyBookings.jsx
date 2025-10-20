import { Typography } from "@mui/material";
import { Button, CircularProgress, Stack, TextField} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import hospitalicon from '../assets/hospitalicon.jpg';
import logo from '../assets/logo.jpg';
import { useLocation } from 'react-router-dom';
import "./MyBookings.css"

const MyBookings=()=>{
  const [appointmentData, setAppointmentData] = useState([]);

 useEffect(() => {
  const storedData = JSON.parse(localStorage.getItem("bookings")) || [];
  // console.log(storedData);
  setAppointmentData(storedData);
}, []);

  // const storedData = JSON.parse(localStorage.getItem("bookings"));
  // setAppointmentData(storedData);
    // const Appointmentdata=JSON.parse(localStorage.getItem("bookings"));

    // const fetchAppointmentdata=()=>{
    //   Appointmentdata=JSON.parse(localStorage.getItem("bookings"));
    // }
    return(

        <Box>
          <h1>My Bookings</h1>
          {appointmentData.length > 0 ? (
            appointmentData.map((appointment, index) => (
              <Box key={index}>
                <Box className="Hospitalinfo" sx={{ display: "flex" }}>
                  <Box className="HospitalIcon" sx={{ width: "140px", height: "140px" }}>
                    <img style={{ width: "100%", height: "100%" }} src={hospitalicon} />
                  </Box>
                  <Box className="Address">
                    <Box className="HospitalName"><h3>{appointment["Hospital Name"]}</h3></Box>
                    <Box sx={{ width: "307px", height: "85px", mt: "12px", ml: "16px" }}>
                      <h2>{appointment.state}, {appointment.city}</h2>
                    </Box>
                  </Box>
                  <Box sx={{ width: "236px", height: "220px" }}>
                    <Box sx={{ width: "114px", height: "20px", color: "#01A400", mb: "11px" }}>
                      Available Today
                    </Box>
                    <Box>{appointment.bookingTime}</Box>
                    <Box>{appointment.bookingDate}</Box>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <p>No bookings available</p>
          )}
        </Box>
    
      
    );
}

export default MyBookings;