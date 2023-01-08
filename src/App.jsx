import { useEffect, useState } from 'react'
import Card from './Card'
import { nanoid } from "nanoid"

function App() {
  // const [count, setCount] = useState(0)

  // 1. create a state to represent the board 
  //     - generate two of each num from 1-18
  //     - represent an element as done / matched with some special character maybe or 0
  // 2. show all the cards on the page, maybe make the card a component

  const [board, setBoard] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [timerOn, setTimerOn] = useState(false);
  const [winState, setWinState] = useState(false);

  

  function getRandomNewBoard() {
    let newBoard = [];

    // generate possible values
    var values = [];
    for (let i = 1; i <= 18; i++) {
      values.push(i);
      values.push(i);
    }
    // console.log("values", values)

    // pick one at random each time and add them to the newBoard
    // for (let i = 0; i < 6; i++) {
    //   let row = [];
      for (let i = 0; i < 36; i++) {
        const rand = Math.floor(Math.random() * values.length);
        const val = values[rand];
        values.splice(rand, 1);
        newBoard.push({
          "id": nanoid(),
          "value": val,
          "paired": false,
          "reveal": false
        });
        // row.push(val);
        // console.log(values);
      }
      // setBoard(newBoard);
      return newBoard
      // newBoard.push(row);
    // }
    // console.log(newBoard)
  }
  
  useEffect(() => {
    const newB = getRandomNewBoard();
    setBoard(newB);
    console.log("board", newB);
    // console.log("cardset", cardset);
  }, [])
  // getRandomNewBoard();
  const ids = board.map(b => b.id)
  // console.log("board ids", ids)

  function handleClick(id, paired, value) {
    // console.log("id", id);
    if (!timerOn && !paired && !revealed.includes(id)) {
      // console.log("id here", id)
      if (revealed.length < 2) {
        setRevealed(prev => {
          return ([...prev, {id, value}])
        })
      }
      setBoard(prevBoard => prevBoard.map(item => { 
          return item.id === id ? {...item, "reveal": true} : item
        })
      )
    }
  }

  function clearRevealed() {
    setBoard(prevBoard => prevBoard.map(item => {
      return {...item, "reveal": false}
    }))
    setRevealed([])
  }

  useEffect(() => {
    if (revealed.length == 2) {
      setTimerOn(true);
      if (revealed[0].value == revealed[1].value) {
        // console.log("here matched")
        setBoard(prevBoard => prevBoard.map(item => {
          return revealed[0].id === item.id || revealed[1].id === item.id ? {...item, "paired": true} : item
        }))
        // console.log(board)
        setTimeout(() => {
          clearRevealed();
          setTimerOn(false);
        }, 1000);
      }
      else {
        setTimeout(() => {
          clearRevealed();
          setTimerOn(false);
        }, 1000);
      }
      
    }
    // return setTimerOn(false);
  }, [revealed])

  const cardset = board.map((c, i) =>
    <Card
      key={i}
      id={c.id}
      num={c.value}
      paired={c.paired}
      reveal={c.reveal}
      handleClick={() => handleClick(c.id, c.paired, c.value)}
    />
  )
  
  useEffect(() => {
    const allPaired = board.every(item => item.paired)
    // console.log("allpaired", allPaired)
    // console.log("winstate", winState)
    if (allPaired) {
      // console.log("set win")
      setWinState(true);
    }
  }, [board])

  function playAgain() {
    const newB = getRandomNewBoard();
    setBoard(newB);
    setWinState(false);
    clearRevealed();
  }


  return (
    <div className="App">
      <h1>Memory Game</h1>
      {winState && <button onClick={playAgain}>Play Again</button>}
      <div className="board-container">
        {cardset}
      </div>
      {/* {board} */}
    </div>
  )
}

export default App
