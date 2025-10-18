import { Typography } from "@mui/material";
import { Button, CircularProgress, Stack, TextField} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import "./SearchHospital.css"
import hospitalicon from "../../assets/hospitalicon.jpg"
import logo from '../../assets/logo.jpg';
import AppointmentSelector from "../Accordion/Accordion.jsx"
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Hospital=()=>{

    const[hospitaldata, sethospitaldata]=useState([]);
    const[appointmenttab, setappointmenttab]=useState(false);
    const[selectedHospital,setselectedHosiptal]=useState();
    const[appointmentdatetime, setappointmentdatetime]=useState({})

   
    const history = useNavigate();
    const location = useLocation();
    const { selectedstate, selectedcity } = location.state || {};
    // Destructure directly from state
    // useEffect(() => {
    //   // Check if it's already stored
    //   const stored = localStorage.getItem('bookings');
    
    //   if (!stored) {
    //     localStorage.setItem('bookings', JSON.stringify({}));
    //     // You can also store other default data here
    //     // localStorage.setItem('selectedstate', 'California');
    //   }
    // }, []);

    console.log("potta",selectedstate, selectedcity);
    useEffect(()=>{
        fetchhospitals()
    },[selectedstate,selectedcity])

    // const setstatevalue=(event)=>{
    //     setstate(event.target.value);
    // }


    // const setcityvalue=(event)=>{
    //     setcity(event.target.value);
    // }
const selectedHospitaldata=(date, time)=>{

  if(date!==undefined&&time!==null){
  setappointmentdatetime({
    date:date,time:time
  })
  console.log("datedabitch",date);
  console.log("timedabitch",time);
  }
}
    const fetchhospitals=async()=>{
      try{
       
     const response= await axios.get(`https://meddata-backend.onrender.com/data?state=${selectedstate}&city=${selectedcity}`)
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
      // localStorage.setItem("hospital",JSON.stringify(hospital));
    }

    const moveBookingpage=()=>{
      console.log(selectedHospital);
      console.log(appointmentdatetime);
      history('/my-bookings', { state: { selectedHospital, appointmentdatetime } });
    }

    return(

       <Box>
         <Box className="header">
<Box className="headerText">
The health and well-being of our patients and their health care team will always be our priority, so we follow the best practices for cleanliness.
</Box>
</Box>
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
<Button onClick={moveBookingpage} sx={{width:"130px",height:"40px",borderRadius:"8px",backgroundColor:"#2AA8FF",ml:"auto"}}>My Bookings</Button>
</Box>
</Box>
        {/* <Box className="searchbox">
        <TxtField className="searchstate" onChange={(event)=>{setstatevalue(event)}}>SearchState</TextField>
        <TextField className="searchCity" onChange={(event)=>{setcityvalue(event)}}>SearchcUT</TextField>
        <Button className="search" onclick={fetchhospitals}>Search</Button>
        </Box> */}
        <Box  sx={{width:"500px",height:"36px",mt:"102px",ml:"129px",mr:"810px"}}>
<h1>{hospitaldata.length} medical centres available in {selectedcity}</h1>
        </Box>
        {/* <Box className="HospitalBox" sx={{display:"flex",flexDirection:"column"}}> */}
        {hospitaldata.length!=0&&hospitaldata.map((hospy,index)=>(
        
       <Box className="Hospitalavailable">
        <Box className="Hospitalinfo" sx={{display:"flex"}}>
          <Box className="HospitalIcon" sx={{width:"140px",height:"140px"}}>
            <img style={{width:"100%",height:"100%"}} src={hospitalicon}></img>
          </Box>
          <Box className="Address">
            <Box className="HospitalName">
            <h3>
            {hospy["Hospital Name"]}
            </h3>
            </Box>
        <Box sx={{width:"307px",height:"85px",mt:"12px",ml:"16px"}}><h1>{selectedcity},{selectedstate}</h1> </Box>
        </Box>
        <Box sx={{width:"236px",height:"220px"}}>
        <Box sx={{width:"114px",height:"20px",color:"#01A400", mb:"11px"}}>Available Today</Box>
        <Button key={hospy["Hospital Name"]} onClick={()=>viewAppointment(hospy)}variant="contained">Book FREE Center Visit</Button>
        </Box>
       </Box>
       {appointmenttab&&selectedHospital["Hospital Name"] === hospy["Hospital Name"] && <Box>
       <AppointmentSelector hospitalobj={selectedHospitaldata}/>
       </Box>}
       </Box>))}
   
        </Box>
    );

}
export default Hospital;