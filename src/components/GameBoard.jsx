import { useState } from "react"
import spawn from "../utility/spawn"
import { useEffect } from "react"
import move from "../utility/move"
import merge from "../utility/merge"

const keyPress = ['w','s','a','d','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','r','q']
let oldBoardState
let undoHistory

function GameBoard(){

  const [board, setBoard] = useState([
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ])

  function handleEvent(e){
    if(keyPress.includes(e.key)){
      if(e.repeat) return
      if(e.key === 'r'){
        console.log('Key Pressed', undoHistory)
        setBoard(undoHistory)
        return
      }
      setBoard(prev => move(prev, e.key))
      setBoard(prev => merge(prev, e.key))
      setBoard(prev => JSON.stringify(oldBoardState) === JSON.stringify(prev) ? prev : spawn(prev))
    }
  }

  useEffect(() => {
    setBoard(prev => spawn(prev))
    window.addEventListener("keydown",e=>{handleEvent(e)})
    return () => {
      window.removeEventListener("keydown", e=>{handleEvent(e)})
    }
  },[])

  useEffect(() => {
    if(board !== undoHistory){
      undoHistory = oldBoardState
    }
    oldBoardState = board
  },[board])

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