import { useState, type ChangeEvent } from "react";
import { FaQrcode, FaSave, FaTrash, FaUpload } from "react-icons/fa";
//import { useEmail } from "../context/EmailContext";
//import qrCode from "qrcode";


export default function DynamicCardInput() {
    const [dynamicCardSRC,setDynamicCardSRC]=useState("");
    const [qrDynamicCard,setqrDynamicCard]=useState("");
    const [qrPopup,setQRPopup] = useState(false);

    function handleDynamicCardUpload(e:ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0];
        if(!file)return;
        if (!file.type.startsWith("image/")) {
            alert("Please upload a valid image file.");
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

    localStorage.setItem("dynamicCardSRC",dynamicCardSRC);
    try{
      if(dynamicCardSRC!=="")
      {
      //const qrb64 =await qrCode.toDataURL("");
      //localStorage.setItem("dynamicCardB64",qrb64);
      //setqrDynamicCard(qrb64);
      //Save to db
      }else {
        setqrDynamicCard("");
        //localStorage.setItem("dynamicCardSRC","");
        //save to db
        }
    }
    catch(error){
      alert("500 : QR could not be generated or stored !");
      console.error(error);
      return;
    }
    
  }

  return (
    <div className="flexn flex-col pb-5 ">
        <div className="flex justify-center  ">
            {
            (qrPopup)?<div className="w-9/10 flex justify-center">
        <img className="h-50 shadow-2xl z-50   w-50" src={qrDynamicCard!=""?qrDynamicCard:"NA"}></img>
        </div>:
            <img className="text-2xl bg-neutral-500 ml-5 font-mono m-3 mb-1 w-9/10 resize-none outline-0 p-0 h-50"
            src={dynamicCardSRC!=""?dynamicCardSRC:""}>
            </img>}
        </div>
        <div className="flex  flex-row-reverse pr-10">
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
