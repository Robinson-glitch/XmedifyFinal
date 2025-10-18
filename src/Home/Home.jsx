import { Typography } from "@mui/material";
import { Button, CircularProgress, Stack, TextField} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import logo from '../assets/logo.jpg';
import hero from '../assets/hero.jpg'
import Doctor from '../assets/Doctor.jpg'
import Drugstore from '../assets/Drugstore.jpg'
import HospitalIcon from '../assets/Hospital.jpg'
import Ambulance from '../assets/Ambulance.jpg'
import capsule from '../assets/Capsule.jpg'
import "./Home.css"
import Hospital from "../components/SearchHospital/SearchHospital.jsx"
import { useNavigate  } from 'react-router-dom';


const LandingPage=()=>{
const[states, setstates]=useState([]);
const[cities, setcities]=useState([]);
const[selectedstate, setselectedstate]=useState();
const[selectedcity, setselectedcity]=useState();
const[showhospital, setshowhospital]=useState(false);

useEffect(()=>{
    fetchAllstates();
    },[])

const history = useNavigate ();

const fetchAllstates=async()=>{
try{
    const response = await axios.get("https://meddata-backend.onrender.com/states");
    setstates(response.data);
}
catch(error){
console.log(error);
}
    
}

const fetchCities=async(state)=>{

    try{
        const response =await axios.get(`https://meddata-backend.onrender.com/cities/${state}`);
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

const setsearchdetails=()=>{
    
    history('/searchHospital', { state: { selectedstate, selectedcity } });
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
<Button sx={{width:"130px",height:"40px",borderRadius:"8px",backgroundColor:"#2AA8FF",ml:"auto"}}>My Bookings</Button>
</Box>
</Box>
<Box className="Herosection" sx={{display:"flex"}} >
<Box className="Herodesciption" sx={{position:"relative"}}>
<Box className="SkipTravel">Skip the travel!,Find Online<br/>Medical Centers</Box>
<Box className="specialist">Connect instantly with a 24x7 specialist or choose to <br/>video visit a particular doctor.</Box>
</Box>
 <Box className="Heroimage" sx={{position:"absolute"}}>
    <Box className="imagebox" sx={{width:"585px",height:"481px",ml:"115px",mt:"69px"}}>
<img  style={{width:"100%",height:"100%",objectFit: "cover" }} src={hero} alt="no img"></img>
 </Box>  
 </Box>
 </Box>
 <Button sx={{ml:"137px",mt:"32px"}} className="findcenters" variant="contained">Find Centres</Button>
 <Box className="searchBox">
    <form onSubmit={setsearchdetails}>
        <div id="state">
<select className="state" value={selectedstate} placeholder="state" id="state" onChange={saveselectedstate}>
<option value="">select state</option>
{states.length>0&&states.map((state,index)=>(
<option key={index} value={state}>{state}</option>
))}
</select>
</div>
<div id="city">
<select className="city" value={selectedcity} placeholder="city" id="city" onChange={saveselectedcity}>
<option value="">select city</option>
{cities.length>0&&cities.map((city,index)=>(
<option key={index} value={city}>{city}</option>
))}
</select>
</div>
<Button sx={{width:"121px",height:"50px",ml:"120px"}}type="submit" id="searchBtn" variant="contained" onClick={showmedicalcentres}>Search</Button>
</form>
<Box className="quicklinks">You may be looking for</Box>
<Box className="quicklinkflex">
<Box className="Doctors">
<img style={{width:"60px",height:"60px",marginLeft:"72px",marginTop:"24px"}} src={Doctor} al="No img"></img>
<Box className="doctorLabel">Doctors</Box>
</Box>
<Box className="Labs">
<img style={{width:"60px",height:"60px",marginLeft:"72px",marginTop:"24px"}} src={Drugstore} al="No img"></img>
<Box className="doctorLabel">Labs</Box>
</Box>
<Box className="Hospital">
<img style={{width:"60px",height:"60px",marginLeft:"72px",marginTop:"24px"}} src={HospitalIcon} al="No img"></img>
<Box className="doctorLabel">Hospital</Box>
</Box>
<Box className="MedicalStore">
<img style={{width:"60px",height:"60px",marginLeft:"72px",marginTop:"24px"}} src={capsule} al="No img"></img>
<Box className="doctorLabel">Medical Store</Box>
</Box>
<Box className="Ambulance">
<img style={{width:"60px",height:"60px",marginLeft:"72px",marginTop:"24px"}} src={Ambulance} al="No img"></img>
<Box className="doctorLabel">Ambulance</Box>
</Box>
</Box>
</Box>

</Box>

{/* {showhospital&&<Hospital state={selectedstate} city={selectedcity}></Hospital>} */}
</Box>
    );
}

export default LandingPage;