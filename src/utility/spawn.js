function randomCoord(board){
  let emptyCell = []
  board.forEach((arr,x) =>{
    arr.forEach((elem,y) =>{
      if(elem === 0){
        emptyCell.push([x,y])
      }
    })
  })
  if(emptyCell.length === 0){
    return [-1,-1]
  }
  const coords = Math.floor(Math.random()*emptyCell.length)
  return emptyCell[coords]
}

export default function spawn(board){
  let newBoard = board.map(row => [...row])
  const probOfSpawn4 = Math.floor(Math.random()*2)
  let [x,y] = randomCoord(board)
  if(x != -1 && y != -1){
    if(probOfSpawn4){
      newBoard[x][y] = 4
    }else{
      newBoard[x][y] = 2
    }
  }else{
    console.log("Game Over")
  }
  return newBoard
}