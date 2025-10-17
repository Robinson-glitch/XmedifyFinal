import { Typography } from "@mui/material";
import { Button, CircularProgress, Stack, TextField} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import "./SearchHospital.css"
import AppointmentSelector from "../Accordion/Accordion.jsx"


const Hospital=({state,city})=>{

    const[hospitaldata, sethospitaldata]=useState([]);
    const[appointmenttab, setappointmenttab]=useState(false);
    const[selectedHospital,setselectedHosiptal]=useState({});


    useEffect(()=>{
        fetchhospitals()
    },[state,city])

    // const setstatevalue=(event)=>{
    //     setstate(event.target.value);
    // }


    // const setcityvalue=(event)=>{
    //     setcity(event.target.value);
    // }

    const fetchhospitals=async()=>{
      try{
       
     const response= await axios.get(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`)
     console.log(response.data);
     sethospitaldata(response.data);
     
      }
      catch(Error){
        console.log(Error);
      }
    }
    const viewAppointment=(hospital)=>{
      setappointmenttab(true);
      setselectedHosiptal(hospital);
    }

    return(

       <Box>
        {/* <Box className="searchbox">
        <TextField className="searchstate" onChange={(event)=>{setstatevalue(event)}}>SearchState</TextField>
        <TextField className="searchCity" onChange={(event)=>{setcityvalue(event)}}>SearchcUT</TextField>
        <Button className="search" onclick={fetchhospitals}>Search</Button>
        </Box> */}
        <Box>
<h1>{hospitaldata.length} medical centres available in {city}</h1>
        </Box>
        {hospitaldata.length!=0&&hospitaldata.map((hospy,index)=>(
        
       <Box>
        <h1>{hospy["Hospital Name"]}</h1>
        <h1>{city},{state}</h1> 
        <Button key={hospy["Hospital Name"]} onClick={()=>viewAppointment(hospy)}variant="contained">Book FREE Center Visit</Button>
       {appointmenttab&&<AppointmentSelector/>}
        </Box>))}
        </Box>
    );

}
export default Hospital;