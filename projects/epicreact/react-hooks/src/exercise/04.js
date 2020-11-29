// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({squares, selectSquare}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [history, setHistory] = useLocalStorageState('squares',
    [emptySquares()])
  const [currentPos, setCurrentPos] = useLocalStorageState('currentPos', 0)

  const currentSquares = history[currentPos]
  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square) {
    console.log({currentPos, currentSquares, square, winner})
    if (winner || currentSquares[square]) {
      // If winner already exists, or square is already taken don't allow it
      // to be selected again.
      return
    }
    const newHistory = history.slice(0, currentPos + 1)
    const squares = [...currentSquares]

    // Really struggled with this and had to peak...
    squares[square] = nextValue
    setHistory([...newHistory, squares])
    setCurrentPos(newHistory.length)
  }

  function restart() {
    setHistory([emptySquares()])
    setCurrentPos(0)
  }

  let moves = calculateMoves({history, currentPos, setCurrentPos})

  return (
    <div className="game">
      <div className="game-board">
        <Board selectSquare={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function emptySquares() {
  return Array(9).fill(null)
}

function calculateMoves({history, currentPos, setCurrentPos}) {
  return history.map((squares, pos) => {
    const desc = pos ? `Go to ${pos}` : 'Go to game start'
    const isCurrentPos = pos === currentPos
    return (
      <li key={pos}>
        <button disabled={isCurrentPos} onClick={() => setCurrentPos(pos)}>
          {desc} {isCurrentPos ? '(current)' : null}
        </button>
      </li>
    )
  })
}

function App() {
  return <Game />
}

export default App
