import {useReducer,createContext} from 'react'

export const AlertObjContext = createContext(null);
export const AlertDispatchContext = createContext(null);

const alertreducer = (alertObj,action)=>{
  switch (action.type) {
    case 'alert': {
      return {
        ...alertObj,
        type:'alert',
        title:action.title,
        body:action.body,
        isShown:true
      }
    };
    case 'confirm': {
      return {
        ...alertObj,
        type:'confirm',
        title:action.title,
        body:action.body,
        isShown:true
      }
    };
    case 'alertHide': {
      return {
        ...alertObj,
        isShown:false
      }
    };
    default:{
      return {
        ...alertObj,
        isShown:false
      }
    }
  }
}

export const AlertProvider = ({children})=>{
  const initialAlertObj = {
  title:"this is an alert",
  body:"this is alert body and it have description about alert",
  type:"confirm",
  isShown:false
}
  const [alertObj,dispatch] = useReducer(alertreducer,initialAlertObj)
  
  return(
    <AlertObjContext.Provider value={alertObj}>
      <AlertDispatchContext.Provider value={dispatch}>
        {children}
      </AlertDispatchContext.Provider>
    </AlertObjContext.Provider>
  )
}