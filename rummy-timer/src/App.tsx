import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const TIME = 60 * 1000 + 999

  const COLORS = ["red", "green", "blue", "orange"]

  const [currTime, setCurrTime] = useState(TIME)
  const [playing, setPlaying] = useState(false)

  const intervalID = useRef<number>() 

  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [totalPlayers, setTotalPlayers] = useState(4)

  useEffect(() => {
    if (playing) {
      if (currTime <= 999) {
        setPlaying(false)
      }
      
      let startTime = Date.now()
      intervalID.current = setInterval(() => {              
        setCurrTime(currTime => currTime - (Date.now() - startTime))
      })
      return () => clearInterval(intervalID.current)
    }
  }, [currTime])

  function resetTimer() {
    clearInterval(intervalID.current)
    setCurrTime(TIME)
  }
  
  useEffect(() => {
    if (playing) {
      setCurrTime(currTime => currTime-1)
    }
  }, [playing])
 
  function handleScreenClick() {
    if (playing) {
      nextPlayer()
      resetTimer()
    }
  }

  function handlePlayClick() {
    if (currTime > 999) {
      setPlaying(playing => !playing)
    } else if (!playing) {
      setPlaying(true)
      nextPlayer()
      resetTimer()
    }
  }

  function removePlayer() {
    setTotalPlayers((totalPlayers) => {
      return (totalPlayers > 2) ? totalPlayers-1 : totalPlayers
    })
  }

  function addPlayer() {
    setTotalPlayers((totalPlayers) => {
      return (totalPlayers < 4) ? totalPlayers+1 : totalPlayers
    })
  }

  function nextPlayer() {
    setCurrentPlayer((currentPlayer) => {
      return (currentPlayer < totalPlayers-1) ? currentPlayer + 1 : 0
    })
  }

  return (
    <div className={"app " + COLORS[currentPlayer]}>
      <div className="playerWrapper">
        <button className="plussminus" onClick={removePlayer}>-</button>

        {[...Array(totalPlayers)].map((_, index) => {
          const className = "player " + COLORS[index]
          return <div className={className} key={index}></div>
        })}

        <button className="plussminus" onClick={addPlayer}>+</button>
      </div>
      <div className="timerWrapper" onClick={handleScreenClick}>
        <p className="timer" >{Math.floor(currTime / 1000)}</p>
        {/* <p className="timer" >{currTime}</p> */}
      </div>
      <button className="startpause" onClick={handlePlayClick}>{playing ? "Pause" : "Start"}</button>
    </div>
  )
}

export default App
