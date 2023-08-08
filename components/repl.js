import Link from 'next/link'
import styles from '@/styles/Repl.module.css'


const Repl =({replData})=>{
  const {replName,replDesc,specialRepl,href,img} = replData
  let ImageUrl = (img.length>1)?img:"https://replit.com/cdn-cgi/image/width=64,quality=80,format=auto/https://storage.googleapis.com/replit/images/1664554617162_2e7e8bc3e2c246c3ae671f60032c9214.jpeg"
  let isDisabled= (specialRepl==='coming soon')
  return(
<Link className={`${styles.project} ${isDisabled?styles.disabled:''}`} href={href} disabled={isDisabled}>
  {specialRepl && <div className={styles.specialRepl}>{specialRepl}</div>}
  <img
  src={ImageUrl}
  alt="python"
  className={styles.replImage}
  />
  <div>
    <span className={styles.replName}>{replName}</span>
    <div className={styles.replDescription}>{replDesc}</div>
  </div>
</Link>
  )
}

export default Repl