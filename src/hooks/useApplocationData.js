import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "statuses";

export default function useApplicationData (props) {
  
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
      });
      
      const setDay = day => setState({...state,day});
    
      useEffect(() => {
        Promise.all([
          axios.get("/api/days"),
          axios.get("/api/appointments"),
          axios.get("/api/interviewers"),
        ]).then((all) => {
          setState((prev) => ({
            ...prev,
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data,
          }));
        });
      }, []);
    

      const updateSpots = (state, appointments) => {
        //state.days --> old, appointment--> new
        const days = state.days.map((day) => {
          const newSpot = day.appointments.reduce((prev, bookedId) => {
            if (appointments[bookedId].interview === null) {
              //increament available spot ---> canceling
              return prev + 1;
            } else {
              return prev;
            }
          }, 0);
          if (state.day === day.name) {
            return { ...day, spots: newSpot };
          } else {
            return { ...day };
          }
        });
        return days;
      };

       const bookInterview = (id, interview) => {
        console.log(`id:${id}, interview: ${interview}`);
    
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
    
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        const days = updateSpots(state, appointments);

        return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment )
          .then(res => {
            console.log("sucess!!!");
            setState(prev => ({
              ...prev,
             appointments, days
            }))
            
          })
      }
    
      const cancelInterview = function (id) {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }
        const days = updateSpots(state, appointments);

        return axios.delete(`/api/appointments/${id}`)
        .then(res => {
          console.log("deleting.......")
          setState(prev => ({
            ...prev,
            appointments, days
          }))
        })
      }
    return {state, setDay, bookInterview, cancelInterview};
}

 