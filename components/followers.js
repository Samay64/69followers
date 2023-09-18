import {useState,useEffect} from 'react'
import styles from '@/styles/Followers.module.css'
import styles2 from '@/styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'


const Followers = ({followerCount})=>{
  const [count,setCount] = useState(12)
  const [allFollowers,setAllFollowers] = useState(initialArr)
  const [isFetching , setIsFetching] = useState(false)
  const loadMore = (allFollowers.length < followerCount)


  const fetchUsers = async (c) => {
    let res = await fetch(`/api/myfollowers?count=${c}`)
    let data = await res.json()
    setAllFollowers(JSON.parse(data).followers)
    setIsFetching(false)
  }
  
  useEffect(()=>{
  fetchUsers(count)
  },[count])
  
  return(
    <div>
      <div className="heading">Road to 100 Followers</div>
            <p>
        thank you guys, you all means a lot to me, lots of love {'<3'} from my side  &nbsp; -_+ <Link href="https://replit.com/@CodeMagnon/" className={styles.link}>@CodeMagnon</Link>
      </p>
    <div className={styles.followerWrap}>
    {allFollowers.map((f,i)=>{
      if(allFollowers.length > 6){
      return <Follower key={f.username} follower={f} index={i} followerCount={followerCount}/>  
      }else{
        return <FollowerLoader key={i}/>
      }
    })}
      </div>
{loadMore && <button onClick={()=>{setCount(count+6);setIsFetching(true)}} 
  className={styles2.button} disabled={isFetching}>Load more</button>}
      
      </div>
  )
}
export default Followers;

const Follower = ({follower,index,followerCount})=>{
      const percent = Math.floor(index/followerCount * 100)
  console.log(percent)
  let link = 'https://replit.com'+follower.url
  return(
    <Link href={link} className={styles.follower}>
       {(percent < 8 ) && <div className={styles.specialRepl}>new</div>}
       {(percent > 50) && <div className={styles.specialRepl}>old</div>}
      <img src={follower.image} className={styles.fImage} alt={follower.username} height={72} width={72}/>
      <div className={styles.fName}><div>{follower.fullName}</div></div>
      <div className={styles.fUsername}>@{follower.username}</div>
    </Link>
  )
}
const FollowerLoader = ()=>{
  let link = '/'
  return(
    <Link href={link} className={styles.follower}>
      <div className={styles.fImageL} height={72} width={72}/>
      <div className={styles.fNameL}><div></div></div>
      <div className={styles.fUsernameL}></div>
    </Link>
  )
}

 let initialArr = [0,1,2,3,4,5]