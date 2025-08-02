import { useState } from "react"
import { FcGoogle } from "react-icons/fc";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import app from "../lib/firebase.ts";
const auth = getAuth(app);
export default function AuthPage() {
    const [authType,setAuthType]=useState<number>(1);
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [passwordConfirmed,setPasswordConfirmed] = useState<string>("");

    function handleAuthTypeChange() {
        if(authType==1)setAuthType(2); //1->acc not there, 2 -> account there
        else setAuthType(1);
    }

    function handleEmailPasswordAuth() {
        if(email===""||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            alert("Invalid Email");
            setEmail("");
            return;
        }
        else if(password!==passwordConfirmed||password===""){
            alert("Invalid Password(s)");
            setPassword("");
            setPasswordConfirmed("");
            return;
        }
        if(authType==2){
            createUserWithEmailAndPassword(auth,email,password)
            .catch((e)=>{
                alert("An Error Occured\n"+e);
            });
        }
        else{
            signInWithEmailAndPassword(auth,email,password)
            .catch((e)=>{
                alert("An Error Occured\n"+e);
            });;
        }

    }
    function handleGoogleAuth() {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth,googleProvider)
        .catch((e)=>{
            alert("An Error Occured\n"+e);
        });
    }

  return (
    <div className="bg-neutral-600 h-screen w-screen flex  justify-center">
        <div className="flex flex-col h-fit my-25 p-3 bg-white justify-end rounded-2xl">
            <div className="flex flex-row-reverse"><p className="text-3xl p-2 text-blue-400 font-mono font-semibold">
                {(authType==1)?"Welcome Back":"Hello There"}
                </p></div>
            <input placeholder="Email" className="bg-neutral-300 mt-0 rounded-sm  px-3 py-2 my-2 text-2xl outline-0" value={email} onChange={(e)=>setEmail(e.target.value.trim())}></input>
            <input placeholder="Password" className="bg-neutral-300 px-3 py-2 rounded-sm mb-2 text-2xl outline-0" value={password} onChange={(e)=>setPassword(e.target.value.trim())}></input>
            {
                (authType==2)?<input placeholder="Confirm Password" className="rounded-sm bg-neutral-300 px-3 py-2 mb-2 text-2xl outline-0" value={passwordConfirmed} onChange={(e)=>setPasswordConfirmed(e.target.value.trim())}></input>:""
            }
            <button onClick={handleEmailPasswordAuth} className="bg-blue-500 p-3 mt-2 rounded-md text-white outline-0 hover:bg-blue-600 active:bg-blue-200 text-4xl font-semibold font-mono">
                {(authType==1)?"Login":"Signup"}
                </button>
            <button onClick={handleGoogleAuth} className="flex items-center gap-4 bg-neutral-600 p-3 mt-2 rounded-md text-white outline-0 hover:bg-neutral-700 active:bg-neutral-500 font-semibold">
                <FcGoogle className="shadow-md text-xl" />
                <span className="text-xl">Continue with Google</span>
            </button>

            <a onClick={handleAuthTypeChange} className="py-2  text-blue-400 hover:text-blue-600">{(authType==1)?"Don't have an account? Signup":"Already have an account? Login"}</a>
        </div>
    </div>
  )
}
