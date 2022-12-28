import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const TIME = 60

  const [timer, setTimer] = useState(TIME)
  const [playing, setPlaying] = useState(false)
  const [intervalId, setIntervalId] = useState<number>()

  function startTimer() {
    setIntervalId(setInterval(() => {
      setTimer(timer => timer-1)
    }, 1000))
  }
  
  useEffect(() => {
    if (playing) {
      if (timer == 0) {
        setTimer(TIME)
      }
      startTimer()
    } else {
      clearInterval(intervalId)
    }
    return () => clearInterval(intervalId)
  }, [playing])

  useEffect(() => {
    if (timer == 0) {
      setPlaying(false)
    }
  }, [timer])
  
  function handleScreenClick() {
    if (playing) {
      clearInterval(intervalId)
      setTimer(TIME)
      startTimer()
    }
  }

  return (
    <div className='main'>
      <p
        className={timer == 0 ? "red" : ""}
        onClick={handleScreenClick}
      >{timer}</p>
      <button onClick={() => {setPlaying(playing => !playing)}}>{playing ? "Pause" : "Start"}</button>
    </div>
  )
}

export default App
