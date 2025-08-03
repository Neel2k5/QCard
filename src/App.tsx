import AuthPage from "./components/AuthPage"
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import app from "./lib/firebase";
import { useState,useEffect } from "react";
import DashBoard from "./components/DashBoard";

import { AuthContext } from "./context/AuthContext";
import { EmailContext } from "./context/EmailContext";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";

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
  
  
    return (
      <>
      <Router>
        <Routes>
          <Route path="/" element = {(userData===null)?<AuthPage/>:
          <AuthContext.Provider value={auth}>
            <EmailContext.Provider value={userData.email}>
              <DashBoard/>
            </EmailContext.Provider>
          </AuthContext.Provider>}/>
          <Route path="view" element = {<>ok</>}/>
        </Routes>
      </Router>
      
      
      
      </>
    )
  
  
}

export default App
