import AuthPage from "./components/AuthPage"
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import app from "./lib/firebase";
import { useState,useEffect } from "react";
import DashBoard from "./components/DashBoard";
import DynamicCardServe from "./components/DynamicCardServe";

import { AuthContext } from "./context/AuthContext";
import { EmailContext } from "./context/EmailContext";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";

const auth = getAuth(app);
//https://q-card-mu.vercel.app/    vercel url
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
          {/*Normal Operation*/}
          <Route path="/" element = {
            (userData===null)?
            <AuthPage/>:
            <AuthContext.Provider value={auth}>
              <EmailContext.Provider value={userData.email}>
                <DashBoard/>
              </EmailContext.Provider>
            </AuthContext.Provider>
          }/>
          {/*Serving data*/}
          <Route path="/dyncard" element = {<DynamicCardServe/>}/>
        </Routes>
      </Router>
      </>
    )
  
  
}

export default App
