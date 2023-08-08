import {useContext} from 'react'
import {AlertObjContext,AlertDispatchContext} from '@/context/alertContext'
import styles from '../styles/Alert.module.css'

const Alert = ()=>{ 
 const dispatch = useContext(AlertDispatchContext)
 const alertObj = useContext(AlertObjContext)
  let isShown = alertObj.isShown;

  const handleOk =()=> {
      dispatch({
    type:'alertOff',
  })
  }
  const handleCancel = ()=> {
      dispatch({
    type:'alertOff',
  })
  }

  return(
    <div className={`${styles.alert} ${(isShown)?'':styles.hide}`}>
      <div className={styles.alertTitle}>{alertObj.title}</div>
      <div className={styles.alertBody}>{alertObj.body}</div>
      <div className={styles.alertBtnWrap}>
        { (alertObj.type === 'confirm' )&& <button className={`${styles.alertBtn} ${styles.red}`} onClick={handleCancel}>cancel</button>}
      <button className={`${styles.alertBtn} ${styles.green}`} onClick={handleOk}>ok</button>
      </div>
    </div>
  )
}

export default Alert;