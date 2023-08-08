import styles from '@/styles/Loader.module.css'

const Loader = ()=>{
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
    <span className={styles.six}>6</span><span className={styles.nine}>9</span>
  </div>
  </div>
  )
}

export default Loader;