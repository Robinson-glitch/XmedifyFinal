import { Typography } from "@mui/material";
import { Button, CircularProgress, Stack, TextField} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import logo from '../assets/logo.jpg';
import "./Home.css"
import Hospital from "../components/SearchHospital/SearchHospital.jsx"
import { useHistory } from 'react-router-dom';


const LandingPage=()=>{
const[states, setstates]=useState([]);
const[cities, setcities]=useState([]);
const[selectedstate, setselectedstate]=useState();
const[selectedcity, setselectedcity]=useState();
const[showhospital, setshowhospital]=useState(false);

useEffect(()=>{
    fetchAllstates();
    },[])

const history = useHistory();

const fetchAllstates=async()=>{
try{
    const response = await axios.get("https://meddata-backend.onrender.com/states");
    console.log(response.data);
    setstates(response.data);
}
catch(error){
console.log(error);
}
    
}

const fetchCities=async(state)=>{

    try{
        const response =await axios.get(`https://meddata-backend.onrender.com/cities/${state}`);
        console.log(response.data);
        setcities(response.data);
    }
    catch(error){
        console.log(error);
    }
}

const saveselectedstate=(event)=>{
    const stateval= event.target.value;
    setselectedstate(event.target.value);
    setselectedcity("");
    fetchCities(stateval);
    setshowhospital(false);
}


const saveselectedcity=(event)=>{
    setselectedcity(event.target.value);
}

const showmedicalcentres=()=>{
    if(selectedstate&&selectedcity){
    setshowhospital(true);
    }
}

const movetoBookingPage=()=>{
    history.push('/my-bookings');
  }

    return(
<Box className="MainOuter">
<Box className="header">
<Box className="headerText">
The health and well-being of our patients and their health care team will always be our priority, so we follow the best practices for cleanliness.
</Box>
</Box>
<Box className="Booking">
<Box className="Links">
<img style={{width:"92px",height:"27px",marginLeft:"135px",marginTop:"32px",objectFit:"contain"}} src={logo} alt="sf"></img>
<Box className="Menu">
<Box className="Menuflex">
<Box sx={{width:"87px",height:"21px"}} className="finddoctor">
Find Doctors
</Box>
<Box sx={{width:"65px",height:"21px"}}className="hospitals">
Hospitals
</Box>
<Box sx={{width:"75px",height:"21px"}} className="Medicines">
Medicines
</Box>
<Box sx={{width:"66px",height:"21px"}} className="Surgeries">
Surgeries
</Box>
<Box sx={{width:"145px",height:"21px"}} className="softwareforProviders">
SoftwareforProviders
</Box>
 <Box sx={{width:"60px",height:"21px"}} className="Facilities">
Facilities
 </Box>
</Box>
<Button sx={{width:"130px",height:"40px",borderRadius:"8px",backgroundColor:"#2AA8FF",ml:"auto"}} onClick={(event)=>movetoBookingPage()}>My Bookings</Button>
</Box>
<Box className="searchMedicalcenter">
<select value={selectedstate} placeholder="state" id="states" onChange={saveselectedstate}>
<option value="">select state</option>
{states.length>0&&states.map((state,index)=>(
<option key={index} value={state}>{state}</option>
))}
</select>
<select value={selectedcity} placeholder="city" id="cities" onChange={saveselectedcity}>
<option value="">select city</option>
{cities.length>0&&cities.map((city,index)=>(
<option key={index} value={city}>{city}</option>
))}
</select>
<Button className="search" onClick={showmedicalcentres}>Search</Button>
</Box>
</Box>
</Box>
{showhospital&&<Hospital state={selectedstate} city={selectedcity}></Hospital>}
</Box>
    );
}

export default LandingPage;