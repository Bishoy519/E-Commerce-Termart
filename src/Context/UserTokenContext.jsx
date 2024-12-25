import { createContext, useEffect, useState } from "react";


export let UserTokenContext = createContext(null);

export default function UserTokenContextProvider(props){
let [token , setToken] = useState(null);
useEffect(()=>{
    if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))}
},[]);


return <>
<UserTokenContext.Provider value={{token,setToken}}>
{props.children}
</UserTokenContext.Provider>
</>
}