import {useState,useEffect} from 'react'
import '@/styles/globals.css'
import Loader from '@/components/loader'
import Alert from '@/components/alert'
import {useRouter} from 'next/router'
import { AlertProvider } from '@/context/alertContext'

export default function App({ Component, pageProps }) {
  const [loading,setLoading] = useState(false)
  const router = useRouter()

    useEffect(() => {
        const handleStart = (url) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url) => setTimeout(()=>{setLoading(false)},1500);

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    },[router.asPath])
  
  return (
    <>
      <AlertProvider>
      <Alert/>
    {loading && <Loader/>}
    {!loading && <Component {...pageProps} />}
      </AlertProvider>
    </>)
}