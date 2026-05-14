import { useState } from "react"
import spawn from "../utility/spawn"
import { useEffect } from "react"
import move from "../utility/move"
import merge from "../utility/merge"
import checkGameOver from "../utility/checkGameOver"

const keyPress = ['w','s','a','d','W','S','A','D','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','r','q']
let oldBoardState
let undoHistory

const TILE_COLOR = {
  0: {
    bg: "#CDC1B4",
    text: "transparent"
  },
  2: {
    bg: "#EEE4DA",
    text: "#776E65"
  },
  4: {
    bg: "#EDE0C8",
    text: "#776E65"
  },
  8: {
    bg: "#F2B179",
    text: "#F9F6F2"
  },
  16: {
    bg: "#F59563",
    text: "#F9F6F2"
  },
  32: {
    bg: "#F67C5F",
    text: "#F9F6F2"
  },
  64: {
    bg: "#F65E3B",
    text: "#F9F6F2"
  },
  128: {
    bg: "#EDCF72",
    text: "#F9F6F2"
  },
  256: {
    bg: "#EDCC61",
    text: "#F9F6F2"
  },
  512: {
    bg: "#EDC850",
    text: "#F9F6F2"
  },
  1024: {
    bg: "#EDC53F",
    text: "#F9F6F2"
  },
  2048: {
    bg: "#EDC22E",
    text: "#F9F6F2"
  },
  4096: {
    bg: "#3C3A32",      // Custom extension beyond the original game
    text: "#F9F6F2"
  }
};

const emptyBoard = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
]

function GameBoard(){

  const [board, setBoard] = useState(emptyBoard)

  const [gameOverCheck, setGameOverCheck] = useState(false)

  function handleEvent(e){
    if(keyPress.includes(e.key)){
      if(e.repeat) return
      if(e.key === 'r'){
        setBoard(undoHistory)
        setGameOverCheck(false)
        return
      }
      if(e.key === 'q'){
        setBoard(emptyBoard)
      }
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
    if(JSON.stringify(oldBoardState) === JSON.stringify(emptyBoard)){
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
        {gameOverCheck && <div className="w-full h-full bg-yellow-200/80 border-2 border-black overflow-hidden absolute rounded-xl flex items-center justify-center text-5xl text-white">Game Over</div>}
        {board.map((e)=>e.map((e,idx)=>{
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