import { useState } from "react"
import spawn from "../utility/spawn"
import { useEffect } from "react"
import move from "../utility/move"
import merge from "../utility/merge"
import checkGameOver from "../utility/checkGameOver"
import { KEY_PRESS, TILE_COLOR, EMPTY_BOARD } from "../constants/gameConstants"

let oldBoardState
let undoHistory

function GameBoard(){

  const [board, setBoard] = useState(EMPTY_BOARD)

  const [gameOverCheck, setGameOverCheck] = useState(false)

  function handleEvent(e){
    if(KEY_PRESS.includes(e.key)){
      if(e.repeat) return
      if(e.key === 'r'){
        setBoard(undoHistory)
        return
      }
      if(e.key === 'q'){
        setBoard(EMPTY_BOARD)
        if(gameOverCheck){
          setGameOverCheck(false)
        }
        return
      }
      if(!gameOverCheck){
        setBoard(prev => move(prev, e.key))
        setBoard(prev => merge(prev, e.key))
        setBoard(prev => JSON.stringify(oldBoardState) === JSON.stringify(prev) ? prev : spawn(prev))
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown",handleEvent)
    if(JSON.stringify(board) === JSON.stringify(EMPTY_BOARD)){
      setBoard(prev => spawn(prev))
    }
    if(JSON.stringify(oldBoardState) === JSON.stringify(EMPTY_BOARD)){
      undoHistory = board
    }else if(board !== undoHistory && JSON.stringify(board) !== JSON.stringify(oldBoardState)){
      undoHistory = oldBoardState
    }
    oldBoardState = board
    setGameOverCheck(checkGameOver(board))
    return () => {
      window.removeEventListener("keydown",handleEvent)
    }
  },[board])

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center outline-0">
        <div className="flex justify-between w-[60vmin] m-2 font-bold">
          <div>R: Undo</div>
          <div>Q: Reset</div>
        </div>
        <div className="bg-[#BBADA0] w-[70vmin] h-[70vmin] rounded-xl grid grid-cols-4 grid-rows-4 gap-2 p-2 relative">
        {
          gameOverCheck && <div className="w-full h-full bg-yellow-200/80 border-2 border-black overflow-hidden absolute rounded-xl flex items-center justify-center text-5xl text-white">
            Game Over
          </div>
        }
        {
          board.map((e)=>e.map((e,idx)=>{
            return (
              <div
                key={idx}
                className="rounded flex items-center justify-center text-2xl"
                style={{
                  backgroundColor: TILE_COLOR[e]?.bg ?? "#3C3A32",
                  color: TILE_COLOR[e]?.text ?? "#F9F6F2",
                }}
              >
                {e === 0 ? "" : e}
              </div>
            );
        }))}
        </div>
      </div>
    </>
  )
}

export default GameBoard