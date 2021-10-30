export function getAppointmentsForDay(state, day) {
  // filtering days array based on day
  const dayObject = state.days.filter((element) => element.name === day);
  if (dayObject.length === 0) {
    return [];
  }
// each dayObject is an array with a single element at index 0 and appointments is also an array
  const appointmentIDs = dayObject[0].appointments;
// creating a new array out of appointmentIDs using map function and returning object of appointments which matches the element of appointmentIDs,i.e. id.
  const appointmentDetails = appointmentIDs.map((id) => state.appointments[id]);

  return appointmentDetails;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerID = interview.interviewer;
  const interviewerObject = state.interviewers[interviewerID]
  return ({...interview, interviewer: interviewerObject})
}


// export function getInterviewersForDay(state, day) {
//   const filteredDays = state.days.filter((singleDay) => { 
//     return singleDay.name === day
//     })

//   if (filteredDays.length === 0) {
//     return [];
//   }
//   const interviewersMapped = filteredDays[0].interviewers.map((int) => {
//     return state.interviewers[int]
//   })

//   return interviewersMapped;
// }

export function getInterviewersForDay(state, day) {
  const result = [];
  const dayData = state.days.filter(d => d.name === day)

  if (!dayData[0]) return result;
  for (const a of dayData[0].interviewers) {
    result.push(state.interviewers[a]);
  }
  
  return result;
};