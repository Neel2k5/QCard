import { useSearchParams } from "react-router-dom";
import { getDynamicCardData } from "../lib/firebaseDBController";
import { useState } from "react";

export default function DynamicCardServe() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const [dynSRC,setDynSRC] = useState("#");
    if(email===null)return <><p>403 : Missing query params</p></>;
    
    
    async function loadCard() {
        try {
        const data = await getDynamicCardData(email);
        if (data) {// check in db
            if(data.dataStr==="")setDynSRC("#");  
            else setDynSRC(data.dataStr);   
        }
        else{
            return <>Failed to fetch card from DB</>;
        }
          } catch (err) {
            return <>Failed to fetch card from DB</>;
          }
    }
    loadCard();
    
    
    
  return (
    <div>
        <img src={dynSRC}></img>
    </div>
  )
}
