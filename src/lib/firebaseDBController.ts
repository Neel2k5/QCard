import app from "./firebase";
import { getFirestore,doc,setDoc, getDoc } from "firebase/firestore";
const db = getFirestore(app);

async function setStaticCardData(dataStr:string,b64QR:string|null,email:string|null){
    try {
        if(dataStr==null||email==null ) return;
        const docRef = doc(db,"static",email);
        await setDoc(docRef,{
            dataStr:dataStr,
            b64QR:b64QR
        });
        alert("201 Card updated");
    } catch (error) {
        alert("Error Updating card : "+error);
        console.error(error);
        return;
    }
    

}
async function setDynamicCardData(dataStr:string,email:string|null){
    try {
        if(dataStr==null||email==null ) return;
        const docRef = doc(db,"dynamic",email);
        await setDoc(docRef,{
            dataStr:dataStr,
        });
        alert("201 Card updated");
    } catch (error) {
        alert("Error Updating card : "+error);
        console.error(error);
        return;
    }
    

}

async function getStaticCardData(email:string|null){
    try{
        if(email==null)return;
        const docRef = doc(db,"static",email);
        const data = await getDoc(docRef);

        return (data.exists()?data.data():null);
    }catch(error){
        alert("Error Fetching data : "+error);
    }
}
async function getDynamicCardData(email:string|null){
    try{
        if(email==null)return;
        const docRef = doc(db,"dynamic",email);
        const data = await getDoc(docRef);

        return (data.exists()?data.data():null);
    }catch(error){
        alert("Error Fetching data : "+error);
    }
}
export {setStaticCardData,getStaticCardData,setDynamicCardData,getDynamicCardData}