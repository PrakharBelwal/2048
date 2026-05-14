import { useState } from "react"
import spawn from "../utility/spawn"
import { useEffect } from "react"
import move from "../utility/move"
import merge from "../utility/merge"
import checkGameOver from "../utility/checkGameOver"

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

  const [gameOverCheck, setGameOverCheck] = useState(false)

  function handleEvent(e){
    if(keyPress.includes(e.key)){
      if(e.repeat) return
      if(e.key === 'r'){
        setBoard(undoHistory)
        return
      }
      if(e.key === 'q'){
        setBoard([
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0]
        ])
      }
      setGameOverCheck(checkGameOver(board))
      if(!gameOverCheck){
        setBoard(prev => move(prev, e.key))
        setBoard(prev => merge(prev, e.key))
        setBoard(prev => JSON.stringify(oldBoardState) === JSON.stringify(prev) ? prev : spawn(prev))
      }
    }
  }

  useEffect(() => {
    setBoard(prev => spawn(prev))
  },[])

  useEffect(() => {
    window.addEventListener("keydown",handleEvent)
    if(board !== undoHistory && JSON.stringify(board) !== JSON.stringify(oldBoardState)){
      undoHistory = oldBoardState
    }
    oldBoardState = board
    console.log(undoHistory, oldBoardState)
    return () => {
      window.removeEventListener("keydown",handleEvent)
    }
  },[board])

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center outline-0">
        <div className="bg-[#BBADA0] w-[70vmin] h-[70vmin] rounded-xl grid grid-cols-4 grid-rows-4 gap-2 p-2 relative">
        {gameOverCheck && <div className="w-full h-full bg-yellow-200/80 border-2 border-black overflow-hidden absolute rounded-xl flex items-center justify-center text-5xl text-white">Game Over</div>}
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