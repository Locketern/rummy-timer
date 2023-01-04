import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [totalTime, setTotalTime] = useState(60000)

  const [colors, setColors] = useState(["red", "green", "blue", "orange"])

  const [clickedColorIndex, setClickedColorIndex] = useState<number>()

  const [currTime, setCurrTime] = useState(totalTime)
  const [playing, setPlaying] = useState(false)

  const intervalID = useRef<number>() 

  const startTime = useRef(Date.now())
  const remainingTime = useRef(totalTime)

  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [totalPlayers, setTotalPlayers] = useState(4)

  useEffect(() => {
    if (playing) {
      if (currTime <= 0) {
        setPlaying(false)
      }
      
      intervalID.current = setInterval(() => {              
        setCurrTime(remainingTime.current - (Date.now() - startTime.current))
      })
      return () => clearInterval(intervalID.current)
    }
  }, [currTime])

  function resetTimer() {
    clearInterval(intervalID.current)
    startTime.current = Date.now()
    remainingTime.current = totalTime
    setCurrTime(totalTime)
  }
  
  useEffect(() => {
    if (playing) {
      startTime.current = Date.now()
      remainingTime.current = currTime
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
    if (currTime > 0) {
      setPlaying(playing => !playing)
    } else if (!playing) {
      setPlaying(true)
      nextPlayer()
      resetTimer()
    }
  }

  function handleResetClick() {
    setPlaying(false)
    if (totalTime != 60000) {
      setTotalTime(60000)
    } else {
      resetTimer()
    }
  }
  
  function handleAddTimeClick() {
    setPlaying(false)
    setTotalTime(currTotalTime => currTotalTime + 30000)
  }

  useEffect(() => {
    resetTimer()
  }, [totalTime])

  function handleColorClick(colorIndex: number) {
    if (clickedColorIndex != undefined) {
      if (clickedColorIndex === colorIndex) {
        setClickedColorIndex(undefined)
      } else {
        setColors(colors => {
          let r = [...colors]
          let t = r[colorIndex]
          r[colorIndex] = r[clickedColorIndex]
          r[clickedColorIndex] = t
          return r
        })
        setClickedColorIndex(undefined)
      }
    } else {
      setClickedColorIndex(colorIndex)
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
    <div className={"app " + colors[currentPlayer]}>
      <div className="playerWrapper">
        <button className="plussminus" onClick={removePlayer}>-</button>

        {[...Array(totalPlayers)].map((_, index) => {
          const className = `player ${colors[index]} ${index === clickedColorIndex ? "selected" : ""}` 
          return <div className={className} onClick={() => handleColorClick(index)} key={index}></div>
        })}

        <button className="plussminus" onClick={addPlayer}>+</button>
      </div>
      <div className="timerWrapper" onClick={handleScreenClick}>
        <p className="timer">{Math.ceil(currTime / 1000)}</p>
        {/* <p className="timer" >{currTime}</p> */}
      </div>
      <div className="bottomWrapper">
        <button onClick={handleResetClick}>Reset</button>
        <button className="startpause" onClick={handlePlayClick}>{playing ? "Pause" : "Start"}</button>
        <button onClick={handleAddTimeClick}>+30s</button>
      </div>
    </div>
  )
}

export default App
