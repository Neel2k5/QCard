
import DashBoardNavBar from "./DashBoardNavBar";
import CardTerminal from "./CardTerminal";
import StaticCardInput from "./StaticCardInput";


export default function DashBoard() {
  return (
    <div className="bg-neutral-600 w-screen h-screen flex flex-col ">
      <DashBoardNavBar  />
      <div className="flex h-full w-screen  flex-col md:flex-row ">
        <CardTerminal NavTitle="Dynamic Card">h1</CardTerminal>
        <CardTerminal NavTitle="Static Card">
          <StaticCardInput />
        </CardTerminal>
      </div>
    </div>
  )
}
