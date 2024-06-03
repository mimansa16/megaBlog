//it's a mechanism on how to protect our pages or routes
// its a protective component

import React,{useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

 export default function Protected({children, authentication = true}) {

  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector(state => state.auth.status);

  useEffect(() => {
    //let authValue = authStatus === true ? true : false
    if(authentication && authStatus !== authentication){
        navigate("/login")
    }
    else if(!authentication && authStatus !== authentication){
        navigate("/")
    }
    setLoader(false);

  }, [authStatus, authentication, navigate])


  return loader ? <h1>Loading...</h1> : <>{children}</>
}
