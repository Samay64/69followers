import { useRef, useState , useEffect,Fragment,useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Password.module.css'
import Notify from '@/components/notify'
import { AlertDispatchContext } from '@/context/alertContext'
import Copy from '@/components/copy'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const dispatch = useContext(AlertDispatchContext)
  let currentphase = null
  const [play,setPlay] = useState(false)
  const [moonPhase,setMoonPhase]=useState(null)
  const [captcha,setcaptcha] = useState('')
  const [wordle,setWordle] = useState()
  const [levels,setLevels] = useState(0)

  useEffect(() => {
    getCaptcha()
  return async ()=>{let word = await getWordle()
  setWordle(word)
  await getMoonPhase()
}
  }, [])
  
  let level = 0;
  const checkObj = {}
  const [password,setPassword] = useState('')
  const [ssPassword,setSsPassword] = useState('')
  const inputRef = useRef(null)

  const handlePasswordChange =(e) => {
    //password box width change
    const allStyles = getComputedStyle(inputRef.current)
    const charSize = Number.parseInt(allStyles.getPropertyValue('font-size').replace('px',''))/1.7
    const actualWidth = Number.parseInt(allStyles.getPropertyValue('width').replace('px',''))
    
    let factor = Math.floor(password.length/(actualWidth/charSize))+1
    factor = (factor*2) + 1
    
    inputRef.current.style.minHeight = factor + 'rem';
    setPassword(e.target.value);
    
    }

  checkObj.long = (password.length > 6)
  checkObj.uppercase = (password !== password.toLowerCase())
  checkObj.num = (/[0-9]/.test(password))
  checkObj.special = (/[^A-Za-z 0-9]/g.test(password))
  let showSum25 = ''
  let sum = 0
if(checkObj.num)  {
  let numbers = password.match(/\d+/g);
  let Allnumbers = []
    numbers.map((num)=>{
    if(num.length === 1){
      Allnumbers.push(num)
    }else{
      num = num.split('')
      Allnumbers = [...Allnumbers , ...num]
    }
  })
  sum = Allnumbers.reduce((sum,num)=>Number.parseInt(sum)+Number.parseInt(num))
  showSum25 = Allnumbers.join(' + ')
  checkObj.sum25 = (sum === 25)
}

if(wordle){
  checkObj.wordle = (password.toLowerCase().includes(wordle.toLowerCase()))
}

checkObj.guess = password.toLowerCase().includes('firefox')

if(captcha !== ''){
  checkObj.captcha = password.includes(captcha)
}

if(moonPhase){
  let phases ={
    'New Moon': '🌑',
'Waxing Crescent Moon': '🌒',
'First Quarter Moon': '🌓',
'Waxing Gibbous Moon': '🌔',
'Full Moon': '🌕',
'Waning Gibbous Moon': '🌖',
'Last Quarter Moon': '🌗',
'Waning Crescent Moon': '🌘',
}
if(!moonPhase.includes('Moon')){
  currentphase = phases[moonPhase+' Moon']
}else{
  currentphase = phases[moonPhase]
}
}

checkObj.moonPhase = password.includes(currentphase)
checkObj.rule10 = levels>=9



//calculate levels
  for(let check in checkObj){
    if(checkObj[check]){
      level++
    }
  }
  
  if(levels < level){
    setLevels(level)
}
  
const getCaptcha = ()=>{
  let newcaptcha = ''
  let chars = 'abcdefghijklmnopqrstuvwxyzBCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  for(let i=0;i<5;i++){
    newcaptcha += chars[Math.floor(Math.random()*chars.length)]
  }
let rand = Math.floor(Math.random()*newcaptcha.length)
newcaptcha = newcaptcha.slice(0,rand)+Math.floor(Math.random()*10)+newcaptcha.slice(rand+1,newcaptcha.length)

setcaptcha(newcaptcha)
}
  
  const getMoonPhase = async ()=>{
    const url = 'https://moon-phase1.p.rapidapi.com/?city=budapest';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '551234b563msh3539df87e13ec8ep154285jsn3d2c7b4e599f',
      'X-RapidAPI-Host': 'moon-phase1.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    setMoonPhase(result.moon.phase)
  } catch (error) {
    console.error(error);
  }
  }
  const rules = [
    {
      title:"Rule 1",
    body:"Your password must be at least 6 characters long",
    pass:checkObj.long
  },
  {
    title:"Rule 2",
    body:"Your password should include a uppercase character",
    pass:checkObj.uppercase
  },
  {
    title:"Rule 3",
    body:"Your password should include a number",
    pass:checkObj.num
  },
  {
    title:"Rule 4",
    body:"Your password should include a special character",
    pass:checkObj.special
  },
  {
    title:"Rule 5",
    body:`All the numbers in Your password should add to 25<br>${showSum25===''?'<b>no numbers in password to calculate</b>':showSum25} ${sum===25?'=':'≠ '} 25`,
    pass:checkObj.sum25
  },
  {
    title:"Rule 6",
    body:"Guess the name of the browser from the emojis and include it in your password",
    pass:checkObj.guess
  },
  {
    title:"Rule 7",
    body:"Your password should include todays wordle answer",
    pass:checkObj.wordle
  },
  {
    title:"Rule 8",
    body:"Your password should include the captcha code below",
    pass:checkObj.captcha,
    special:{captcha:captcha,getCaptcha:getCaptcha,},
  },
  {
    title:"Rule 9",
    body:"Your password should include current phase of moon in <span><b>budapest, Hungary</b> as emoji😊</span>",
    pass:checkObj.moonPhase,
  },
  {
    title:"Rule 10",
    body:"<b>your password is now super strong 💪</b>",
    pass:checkObj.rule10,
  }

]


const handleCopy = ()=>{
  navigator.clipboard.writeText(password)
}

const handleSubmit = ()=>{
  if(levels >= 9){
    if(password === ssPassword){
      dispatch({
        type:'confirm',
        title:'This message is for you',
        body:`press ok to proceed`,
        action:()=>{setPlay(true);console.log('video played')},
      })
    }
  }
}

  if(level<=9){
    if(play){ 
    setPlay(false)
    }
  }

  return (
    <>
      <Head>
        <title>The password Game</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
      <div className={styles.game}>
        <div className={styles.headingP}>The Password Game</div>
        <div className={styles.mssg}>(make your password super strong)</div>
        <div className={styles.flex}>
        <textarea type="text" placeholder='Enter your Password' className={`${styles.input} ${level>=10?styles.strongPassword:''}`} onChange={(e)=>{handlePasswordChange(e)}} ref={inputRef} disabled = {level >= 10}/>
        <Copy onClick={handleCopy}/>
        </div>
        <div className={styles.wrapper}>
            {rules.filter(r=>r.pass).map((rule,i)=>{
              return (
                <Fragment key={`${rule.title} ${rule.pass}`}>
                {levels >= i && <Notify title={rule.title} body={rule.body} pass={rule.pass}  special={rule.special}/>}
                </Fragment>
              )
            })
          }
            {rules.map((rule,i)=>{
              if(rule.pass){
                return
              }
              return (
                <Fragment key={`${rule.title} ${rule.pass}`}>
                {levels >= i && <Notify title={rule.title} body={rule.body} pass={rule.pass} key={`${rule.title}`} special={rule.special}/>}
                </Fragment>
              )
            })
          }
        </div>
        </div>
      <div className={styles.sectionP}>
        <h1>Special Message for You</h1>
      {!play && <Image className={styles.secretI}  src='/assets/images/secret.png' height={140} width={200} alt="secret message"/>}
       {play && <video className={styles.secretV} autoPlay loop preload='auto'>
          <source src='/assets/videos/secret.mp4' />
        </video>}
        <h3>*only a strong password can open this file</h3>
        <textarea className={styles.input} placeholder='Enter Your Super Strong Password' onChange={(e)=>{setSsPassword(e.target.value)}}/>
        <button className={styles.submit} onClick={handleSubmit}>submit</button>
      </div>
      </div>
    </>
  )
}

const getWordle = async ()=>{
const url = 'https://wordle-answers-solutions.p.rapidapi.com/today';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '551234b563msh3539df87e13ec8ep154285jsn3d2c7b4e599f',
		'X-RapidAPI-Host': 'wordle-answers-solutions.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
  return result.today
} catch (error) {
	console.error(error);
  return error
}
}