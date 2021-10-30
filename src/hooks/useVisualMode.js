import { useState } from "react"


function useVisualMode (initial) {

    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    function transition (newMode, error) {
        //If there is an error, places the new mode in the correct position
    if (error) {
      const newHistory = [...history];
      newHistory.pop();
      
      setHistory(prevHistory => [...newHistory, newMode]);
      setMode(newMode);
    } else {
      //Change history to a copy of the history with newMode at the end.
      setHistory(prevHistory => [...prevHistory, newMode]);
      //Asign mode to new mode
      setMode(newMode);
    }
  };
    function back () {
        if (history.length === 1 ) return;
        let historyStack = history.slice(0,history.length-1)
        setHistory ([...historyStack])
        setMode(history[history.length-2])
    }
    return { mode , transition, back }
}

export default useVisualMode;