import Game from '@/components/10secGame'
import Head from 'next/head'

const Repl = ()=>{
  return(
    <div style={{width:"100%",height:"100%"}}>
      <Head>
      <title>CodeMagnon|10 sec Game</title>
      </Head>
      <Game/>
    </div>
  )
}

export default Repl;