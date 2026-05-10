export default function rotate(board){
  let rotatedBoard = board.map(row => [...row])
  board.forEach((row,x) => row.forEach((elem,y) => {
    rotatedBoard[y][x] = elem
  }))
  return rotatedBoard
}
