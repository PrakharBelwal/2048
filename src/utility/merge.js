import move from "./move"
import rotate from "./rotate"

export default function merge(board, dir){
  let newBoard = board.map(row => [...row])
  switch(dir){
    case 'w':
    case 'ArrowUp':
      newBoard = rotate(newBoard)
      newBoard.forEach((row,x) => {
        for(let y = 0; y < 3; y++){
          if(newBoard[x][y] === newBoard[x][y+1]){
            newBoard[x][y] = newBoard[x][y] + newBoard[x][y+1]
            newBoard[x][y+1] = 0
          }
        }
      })
      newBoard = rotate(newBoard)
      break
    case 's':
    case 'ArrowDown':
      newBoard = rotate(newBoard)
      newBoard.forEach((row,x) => {
        for(let y = 3; y > 0; y--){
          if(newBoard[x][y] === newBoard[x][y-1]){
            newBoard[x][y] = newBoard[x][y] + newBoard[x][y-1]
            newBoard[x][y-1] = 0
          }
        }
      })
      newBoard = rotate(newBoard)
      break
    case 'd':
    case 'ArrowRight':
      console.log(newBoard)
      newBoard.forEach((row,x) => {
        for(let y = 3; y > 0; y--){
          if(newBoard[x][y] === newBoard[x][y-1]){
            newBoard[x][y] = newBoard[x][y] + newBoard[x][y-1]
            newBoard[x][y-1] = 0
          }
        }
      })
      break
    case 'a':
    case 'ArrowLeft':
      newBoard.forEach((row,x) => {
        for(let y = 0; y < 3; y++){
          if(newBoard[x][y] === newBoard[x][y+1]){
            console.log(newBoard[x][y],newBoard[x][y+1])
            newBoard[x][y] = newBoard[x][y] + newBoard[x][y+1]
            newBoard[x][y+1] = 0
          }
        }
      })
      break
    }
    newBoard = move(newBoard, dir)
    return newBoard
  }