import type { ReactNode } from "react"


type CardTerminalTypes = {
  NavTitle:string
  children:ReactNode
}

export default function CardTerminal({ NavTitle, children }:CardTerminalTypes) {
  return (
    <div className="flex flex-col bg-white h-fit w-6/7 mt-5 mx-5 md:w-full shadow-2xl ">
      <div className="w-full h-fit flex justify-between bg-blue-500 shadow-2xl">
        <p className="text-3xl text-white font-mono p-5">{NavTitle}</p>
        
      </div>
      {children}
    </div>
  )
}
