import { signOut } from "firebase/auth";
import { useEmail } from "../context/EmailContext";
import { useAuth } from "../context/AuthContext";
import { FaQrcode } from "react-icons/fa";
import { useState } from "react";

export default function DashBoardNavBar() {
  const email = useEmail();
  const auth = useAuth();

  const [isDroppedDown, setIsDropDown] = useState(false);
  const [ddExists, setddExists] = useState(false);

  async function handleLogOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
  }
}

  function toggleDropdown() {
    if (isDroppedDown) {
      setIsDropDown(false);
      setTimeout(() => setddExists(false), 200); // Let fade out finish
    } else {
      setddExists(true);
      setIsDropDown(true);
    }
  }

  return (
    <div className="flex justify-between bg-blue-500 p-5 shadow-2xl">
      <div className="flex items-center">
        <div className="text-5xl font-mono  mr-5 font-semibold text-white flex gap-5 shadow-2xs relative">
          <FaQrcode
            className={`${isDroppedDown ? "text-blue-200" : ""} cursor-pointer hover:text-neutral-300`}
            onClick={toggleDropdown}
          />
          {ddExists && (
            <div
              className={`absolute left-0 mt-20 ml-5 bg-white border rounded w-72 shadow-md z-10 transition-all duration-200 ease-in-out transform origin-top pointer-events-auto
                ${
                  isDroppedDown
                    ? "animate-[fadeInScale_0.2s_ease-out_forwards]"
                    : "animate-[fadeOutScale_0.2s_ease-in_forwards]"
                }`}
            >
              <div className="w-full text-left px-4 py-4  cursor-pointer text-xl text-gray-700 font-semibold hover:bg-neutral-300">
                <button onClick={() => {}}>How it works?</button>
                <div className="px-0 py-2 text-sm font-medium text-blue-400 truncate">
                  Setup your digital QR card!
                </div>
              </div>

              <div onClick={ ()=>{
                localStorage.clear();
                  handleLogOut();
                }}className="w-full text-left cursor-pointer  px-4 py-4 text-xl text-gray-700 font-semibold hover:bg-neutral-300">
                <button >Log out</button>
                <div className="px-0 py-2 text-sm font-medium text-blue-400 truncate">
                  {email}
                </div>
              </div>
            </div>
          )}
          <span className="ml-4">QCard DashBoard</span>
        </div>
      </div>
    </div>
  );
}
