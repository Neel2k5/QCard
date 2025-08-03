import { useEffect, useState } from "react";
import { FaQrcode, FaSave, FaTrash } from "react-icons/fa";
import { getStaticCardData, setStaticCardData } from "../lib/firebaseDBController";
import { useEmail } from "../context/EmailContext";
import qrCode from "qrcode";


export default function StaticCardInput() {
  const email = useEmail();
  
  const [staticCard,setStaticCard]=useState("");
  const [bytesLeft,setBytesLeft]=useState(1500);
  const [qrPopup,setQRPopup] = useState(false);
  const [qrStaticCard,setQrStaticCard]=useState("");

  useEffect(()=>{
    const staticCardSRC = localStorage.getItem("staticCardSRC");
    const staticCardQR = localStorage.getItem("staticCardB64");
    if(staticCardSRC&&staticCardQR){
      setStaticCard(staticCardSRC);
      setQrStaticCard(staticCardQR);
      return;
    }
    //Else look for in database
    async function fetchData() {
    try {
      const data = await getStaticCardData(email);
      if (data) {
        setStaticCard(data.dataStr);
        setQrStaticCard(data.b64QR);
        localStorage.setItem("staticCardSRC", data.dataStr);
        localStorage.setItem("staticCardB64",data.b64QR);
      }
    } catch (err) {
      console.error("Failed to fetch static card from DB:", err);
    }
  }
  fetchData();

  },[]);

  useEffect(()=>{
    setBytesLeft(()=>1500-staticCard.length);
  },[staticCard])

  async function saveStaticCardState() {

    localStorage.setItem("staticCardSRC",staticCard.trim());
    try{
      if(staticCard!=="")
      {
      const qrb64 =await qrCode.toDataURL(staticCard);
      localStorage.setItem("staticCardB64",qrb64);
      setQrStaticCard(qrb64);
      await setStaticCardData(staticCard,qrb64,email);
      }else {
        setQrStaticCard("");
        localStorage.setItem("staticCardB64","");
        await setStaticCardData(staticCard,"",email);}
    }
    catch(error){
      alert("500 : QR could not be generated or stored !");
      console.error(error);
      return;
    }
    
  }
  
  return (
    <div className="flex flex-col justify-between pb-5">
      {(qrPopup&&(qrStaticCard!==""))?<div className="w-9/10 flex justify-center">
        <img className="h-50 shadow-2xl z-50   w-50" src={qrStaticCard!=""?qrStaticCard:"NA"}></img>
        </div>:
      <textarea className="bg-neutral-500 text-2xl ml-5 font-mono m-3 mb-1 w-9/10 resize-none outline-0 p-2 h-50"
      value={staticCard}
      onChange={(e)=>{
        setStaticCard(e.target.value);
      }}
      ></textarea>}
      <div className="flex mt-2 mr-8 flex-row-reverse justify-between ">
        <div className="flex ">
        <button className="mx-1 cursor-pointer  z-30 bg-blue-500 p-3 text-white hover:bg-blue-700 active:bg-blue-400 text-3xl "
        onClick={()=>{
          setStaticCard("");
        }}><FaTrash></FaTrash></button>
        <button className="mx-1 cursor-pointer z-30 bg-blue-500 p-3  text-white hover:bg-blue-700 active:bg-blue-400 text-3xl "
        onClick={()=>{
          const confirmSave = window.confirm("Are you sure you want to save changes?");
          if (confirmSave) {
            saveStaticCardState();
          }
        }}><FaSave/></button>
        <button className="mx-1 mr-2 cursor-pointer z-30 bg-blue-500 p-3  text-white hover:bg-blue-700 active:bg-blue-400 text-3xl "
        onClick={()=>{
            //popup with QRCODE
            if(qrStaticCard===""){
              alert("Card is empty");
              return;
            }
            setQRPopup(p=>!p);
        }}><FaQrcode/></button>
      
        </div>
        
        <p className="mx-9 font-mono">{"Bytes Left : "+bytesLeft  }</p>
      </div>
    </div>
  )
}
