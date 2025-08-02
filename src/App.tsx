import AuthPage from "./components/AuthPage"
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import app from "./lib/firebase";
import { useState,useEffect } from "react";
import DashBoard from "./components/DashBoard";

import { AuthContext } from "./context/AuthContext";
import { EmailContext } from "./context/EmailContext";

const auth = getAuth(app);

function App() {
 
  const [userData,setUserData] = useState<User|null>(null);


  useEffect(()=>{
      onAuthStateChanged(auth,user=>{
        if(user){
          setUserData(user||null);
        }
        else{
          setUserData(null);
        }
      })
    },[]);
  
  
  if(userData===null){
    return (
    <>
      <AuthPage/>
    </>
  )
  }
  else {
    return (
      <>

      <AuthContext.Provider value={auth}>
        <EmailContext.Provider value={userData.email}>
          <DashBoard/>
        </EmailContext.Provider>
      </AuthContext.Provider>
      
      
      </>
    )
  }
  
}

export default App
