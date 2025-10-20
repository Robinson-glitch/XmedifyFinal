import React, { useState,useEffect } from 'react';

const dates = [
  { label: 'Today', slots: 11 },
  { label: 'Tomorrow', slots: 17 },
  { label: 'Fri, 5 May', slots: 18 },
];

const timeSlots = {
  Morning: ['11:30 AM'],
  Afternoon: ['12:00 PM', '12:30 PM', '01:30 PM', '02:00 PM', '02:30 PM'],
  Evening: ['06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'],
};

const AppointmentSelector = ({hospitalobj}) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const[selecteddate, setselecteddate]=useState();

  useEffect(()=>{
    updateBookingpage();
  },[selectedTime,selecteddate])

  const  updateBookingpage=()=>{
    hospitalobj(selecteddate,selectedTime);
  }

  
  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', fontFamily: 'Arial' }}>
      {/* Date Tabs */}
      <div style={{ display: 'flex', overflowX: 'auto', justifyContent: 'space-between', marginBottom: 20 }}>
        {dates.map((date, idx) => (
          <div
            key={idx}
            onClick={() => {
              setSelectedDateIndex(idx);
              setSelectedTime(null);
              setselecteddate(date.label);
              // hospitalobj(date.label,null);
            }}
            style={{
              flex: '1',
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              borderBottom: selectedDateIndex === idx ? '3px solid #007bff' : '1px solid #ddd',
              fontWeight: selectedDateIndex === idx ? 'bold' : 'normal',
              color: selectedDateIndex === idx ? '#000' : '#555',
            }}
          >
            <div>{date.label}</div>
            <div style={{ fontSize: '12px', color: 'green' }}>
              {date.slots} Slots Available
            </div>
          </div>
        ))}
      </div>

      {/* Time Slots */}
      {Object.keys(timeSlots).map((period) => (
        <div key={period} style={{ marginBottom: 20 }}>
          <p style={{ marginBottom: 10, color: '#444' }}>{period}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {timeSlots[period].map((time) => (
              <button
                key={time}
                onClick={() => {setSelectedTime(time);
                  // hospitalobj(selecteddate,time);
                }}
                style={{
                  padding: '10px 15px',
                  border: `1px solid ${selectedTime === time ? '#007bff' : '#ccc'}`,
                  borderRadius: '5px',
                  background: selectedTime === time ? '#e6f0ff' : 'white',
                  color: '#007bff',
                  cursor: 'pointer',
                  fontWeight: selectedTime === time ? 'bold' : 'normal',
                }}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentSelector;
