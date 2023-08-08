import {useState,useRef, useContext} from 'react'
import styles from '@/styles/Counter.module.css'
import styles2 from '@/styles/Loader.module.css'
import Link from 'next/link'
import { AlertDispatchContext } from '@/context/alertContext'

const Counter = ()=>{
  const [time,setTime] = useState(0);
  const [startTime,setStartTime] = useState(0);
  const timerId = useRef(0);
  const dispatch = useContext(AlertDispatchContext)
  let totalSeconds = 0;
  
  const startTimer=()=>{
    clearInterval(timerId.current);
    setStartTime(Date.now())
    setTime(Date.now())
    if(time>0){
    }
   timerId.current =  setInterval(()=>{
      setTime(Date.now())
    },100)
  }

  const stopTimer=()=>{
    clearInterval(timerId.current)
    isWinner()
  }

  const prettytime=(time)=>{
    let seconds = Math.floor(time)
    let milli = Math.floor((time-seconds)*10)
    if(seconds<10){
      seconds = `0${seconds}`
    }
    let timeString = `${seconds}:${milli}`
    return timeString;
  }
 if(startTime !== 0 && time !== 0){
   let newTime = (time - startTime)/1000
   totalSeconds = prettytime(newTime)
 }

  const isWinner = ()=>{
    if(totalSeconds === '10:0'){
      dispatch({
        type:'alert',
        title:"Congratulation!! You Won",
        body:"🍕 here is your reward"
      })
    }
  }
  return(
    <div className={styles2.container}>
      <Link href="/" className={styles.btnHome}>back</Link>
    <div className={styles.counterWrap}>
      <h1 className={styles.heading}>10 Seconds Game</h1>
      <div className={styles.instructions}>
      <h2 className={styles.heading2}>how to play?</h2>
      <p className={styles.para}><b>stop the timer exactly at <i>10 seconds</i></b><br/><b>red button :</b> stop the timer<br/><b>green button :</b> start/reset the timer<br/></p>
        </div>
      <div className={styles.btnWrap}>
      <button className={`${styles.counterBtn} ${styles.green}`}
        onClick={startTimer}></button>
      <button className={`${styles.counterBtn} ${styles.red}`}
        onClick={stopTimer}></button>
      </div>
      <div className={styles.timer}>
        {totalSeconds}
      </div>
    </div>
    </div>
  )
}

export default Counter;
