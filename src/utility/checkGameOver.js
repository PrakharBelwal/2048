export default function checkGameOver(board){
  for(let x = 0; x < 4; x++){
    for(let y = 0; y < 4; y++){
      if(board[x][y] === 0)
        return false
    }
  }
  for(let row = 0; row < 4; row++){
    for(let col = 1; col < 3; col++){
      if(board[row][col] === board[row][col-1]) return false
      if(board[row][col] === board[row][col+1]) return false
    }
  }
  for(let col = 0; col < 4; col++){
    for(let row = 1; row < 3; row++){
      if(board[row][col] === board[row-1][col]) return false
      if(board[row][col] === board[row+1][col]) return false
    }
  }
  return true
}