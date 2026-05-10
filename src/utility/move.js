import rotate from "./rotate"

export default function move(board, dir){
  let newBoard = board.map(row => [...row])
  switch(dir){
    case 'w':
    case 'ArrowUp':
      console.log('Up')
      newBoard = rotate(board)
      newBoard = newBoard.map(row => {
        let filtered = row.filter(elem => elem !== 0)
        if(filtered.length < row.length){
          while(filtered.length < row.length){
            filtered.push(0)
          }
        }
        return filtered
      })
      newBoard = rotate(newBoard)
      break
    case 's':
    case 'ArrowDown':
      console.log('Down')
      newBoard = rotate(board)
      newBoard = newBoard.map(row => {
        let filtered = row.filter(elem => elem !== 0)
        if(filtered.length < row.length){
          while(filtered.length < row.length){
            filtered.unshift(0)
          }
        }
        return filtered
      })
      newBoard = rotate(newBoard)
      break
    case 'a':
    case 'ArrowLeft':
      console.log('Left')
      newBoard = board.map(row => {
        let filtered = row.filter(elem => elem !== 0)
        if(filtered.length < row.length){
          while(filtered.length < row.length){
            filtered.push(0)
          }
        }
        return filtered
      })
      break
    case 'd':
    case 'ArrowRight':
      console.log('Right')
      newBoard = board.map(row => {
        let filtered = row.filter(elem => elem !== 0)
        if(filtered.length < row.length){
          while(filtered.length < row.length){
            filtered.unshift(0)
          }
        }
        return filtered
      })
      break
  }
  return newBoard
}