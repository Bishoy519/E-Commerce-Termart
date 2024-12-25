import { createContext, useEffect, useState } from "react";

export let CounterContext = createContext(0); 

export default function CounterContextProvider(props) {
    let [counter, setCounter] = useState(20);
    let [userName, setUserName] = useState("route");
   

    return (
        <CounterContext.Provider value={{ counter, setCounter ,userName }}>
            {props.children}
        </CounterContext.Provider>
    );
}
