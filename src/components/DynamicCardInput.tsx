import { useEffect, useState, type ChangeEvent } from "react";
import { FaQrcode, FaSave, FaTrash, FaUpload } from "react-icons/fa";
import { useEmail } from "../context/EmailContext";
import qrCode from "qrcode";
import { getDynamicCardData, setDynamicCardData } from "../lib/firebaseDBController";


export default function DynamicCardInput() {
    const email = useEmail();
    const endpt = import.meta.env.VITE_DYNAMIC_ENDPOINT;

    const qrURL = `${endpt}?email=${email}`;

    
    const [dynamicCardSRC,setDynamicCardSRC]=useState("");
    const [qrDynamicCard,setqrDynamicCard]=useState("");
    const [qrPopup,setQRPopup] = useState(false);

    useEffect( ()=>{
      initStates(); // on load set the url and qr code
      
    },[]);

    async function  qrUpdate() {
      let qrb64 = localStorage.getItem("dynamicCardB64"); //check if qr code exists in local storage
      if(!qrb64){// qr code's link is fixed from env
        
        qrb64 =await qrCode.toDataURL(qrURL);
        localStorage.setItem("dynamicCardB64",qrb64);
      }
      setqrDynamicCard(qrb64);
    }
    async function initStates() {
      await qrUpdate();

      let dynSRC = localStorage.getItem("dynamicCardSRC");
      if(!dynSRC){
        // look in db
        try {
        const data = await getDynamicCardData(email);
        if (data) {// check in db
          dynSRC= data.dataStr;
          
        }
          } catch (err) {
            console.error("Failed to fetch dynamic card from DB:", err);
          }
      }
      //save the dynamic card image file
      if (dynSRC) {
        setDynamicCardSRC(dynSRC);
        localStorage.setItem("dynamicCardSRC", dynSRC); 
      } else {
        setDynamicCardSRC("");
        localStorage.setItem("dynamicCardSRC", "");
      }
      
    }
    
    function handleDynamicCardUpload(e:ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0];
        if(!file)return;
        if (!file.type.startsWith("image/")) {
            alert("Please upload a valid image file.");
            return;
        }
        if (file.size > 700000) { // ~700 KB
          alert("Image too large. Please upload an image under 700 KB.");
          return;
        }

        const Reader = new FileReader();
        Reader.onloadend= ()=>{
            const dynamicBuisnesscard = Reader.result as string;
            
            setDynamicCardSRC(dynamicBuisnesscard);

        };
        Reader.readAsDataURL(file);
    };
    async function saveDynamicCardState() {
    //update the local storage
    localStorage.setItem("dynamicCardSRC",dynamicCardSRC);
    //update the db
    try{
      setDynamicCardData(dynamicCardSRC,email);
    }
    catch(error){
      alert("500 : Card could'nt be stored in db!");
      console.error(error);
      return;
    }
    
  }

  return (
    <div className="flex  flex-col pb-5 ">
        <div className="flex justify-center   ">
            {
            (qrPopup)?<div className="w-9/10 flex justify-center">
        <img className="h-50 shadow-2xl   w-50" src={qrDynamicCard!="."?qrDynamicCard:"NA"}></img>
        </div>:
            <img className="text-2xl bg-neutral-500 ml-5 font-mono m-3 mb-1 w-9/10 resize-none outline-0 p-0 h-50"
            src={dynamicCardSRC!=""?dynamicCardSRC:""}>
            </img>}
        </div>
        <div className="font-mono text-sm p-0 m-0 text-wrap  mr-0 md:mr-10 flex justify-center "><div>Uploaded image must not exceed 700KB</div></div>
        <div className="flex  flex-row-reverse pr-10 pt-3">
                <button className="mx-1 cursor-pointer  z-30 bg-blue-500 p-3 text-white hover:bg-blue-700 active:bg-blue-400 text-3xl "
                onClick={()=>{
                  setDynamicCardSRC("");
                }}><FaTrash></FaTrash></button>
                <button className="mx-1 cursor-pointer z-30 bg-blue-500 p-3  text-white hover:bg-blue-700 active:bg-blue-400 text-3xl "
                onClick={()=>{
                  const confirmSave = window.confirm("Are you sure you want to save changes?");
                  if (confirmSave) {
                    saveDynamicCardState();
                  }
                }}><FaSave/></button>
                <button className="mx-1 mr-2 cursor-pointer z-30 bg-blue-500 p-3  text-white hover:bg-blue-700 active:bg-blue-400 text-3xl "
                onClick={()=>{
                    //popup with QRCODE
                    if(qrDynamicCard===""){
                      alert("Card is empty");
                      return;
                    }
                    setQRPopup(p=>!p);
                }}><FaQrcode/></button>
                <label className="mx-1 mr-2 cursor-pointer z-30 bg-blue-500 p-3  text-white hover:bg-blue-700 active:bg-blue-400 text-3xl ">
                    <FaUpload/>
                 <input type="file" accept="image/*" onChange={handleDynamicCardUpload} className="hidden"></input>
                </label>
                
               
        </div>
        
    </div>    
  )
}
