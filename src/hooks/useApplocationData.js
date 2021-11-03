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
    
        setState({
          ...state,
          appointments
        });
        // const countSpot = function (state) {
        //   let spot =  5;
        //   state.days.map(day => day.name === state.day)
        //   // const day = {...state.days[index], spots:interview === null ? spots+1 : spots-1};
        // }
        // console.log(appointments.interview)
        
        return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment )
          .then(res => {
            console.log("sucess!!!");
            setState(prev => ({
              ...prev,
             appointments
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
    
        setState({
          ...state,
          appointments
        });
        return axios.delete(`/api/appointments/${id}`)
        .then(res => {
          console.log("deleting.......")
          setState(prev => ({
            ...prev,
            appointments
          }))
        })
      }
    return {state, setDay, bookInterview, cancelInterview};
}

 