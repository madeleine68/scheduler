import { useState } from "react"


function useVisualMode (initial) {

    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    function transition (newMode, replace = false) {
        //If there is an error, places the new mode in the correct position
        if (replace) {
          setMode((prev) => newMode)
          let replaceHistory = [...history];
          replaceHistory[replaceHistory.length - 1] = mode;
          setHistory((prev) => replaceHistory);
        } else {
          setMode((prev) => newMode);
          let newHistory = [...history];
          newHistory.push(newMode);
          setHistory((prev) => newHistory);
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