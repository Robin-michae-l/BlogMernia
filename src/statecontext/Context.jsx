import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const blogResponse=createContext()
export const editResponse=createContext()

export const isauthtokencontext=createContext()



function Context({children}) {
    const [addblogs,setblogsresponse]=useState({})

    const [editblogs,seteditresponse]=useState({})

    const [isauthtoken,setisauthtoken]=useState(true)

    
  return (
    <>
    <blogResponse.Provider value={{addblogs,setblogsresponse}}>
       <editResponse.Provider value={{editblogs,seteditresponse}}> 
       <isauthtokencontext.Provider value={[isauthtoken,setisauthtoken]}>
       
       {children}

       </isauthtokencontext.Provider>
       
       </editResponse.Provider>
    </blogResponse.Provider>
    </>
  )
}

export default Context