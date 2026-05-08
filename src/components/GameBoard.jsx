import { useState } from "react"
import spawn from "../utility/spawn"
import { useEffect } from "react"

function GameBoard(){

  const [board, setBoard] = useState([
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ])

  function handleEvent(){
    setBoard(prev => spawn(prev))
  }

  useEffect(() => {
    window.addEventListener("keydown",handleEvent)
    return () => {
      window.removeEventListener("keydown", handleEvent)
    }
  },[])

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center outline-0">
        <div className="bg-[#BBADA0] w-[70vmin] h-[70vmin] rounded-xl grid grid-cols-4 grid-rows-4 gap-2 p-2">
        {board.map((e)=>e.map((e,idx)=>{
          return(
            <div key={idx} className="bg-[#efe6db] rounded flex items-center justify-center text-2xl">
              {e === 0 ? "" : e}
            </div>
          )
        }))}
        </div>
      </div>
    </>
  )
}

export default GameBoard