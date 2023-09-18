import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Notify.module.css'

const Notify = ({title,body,pass,special}) => {
  const handleCaptchaClick = () => {
    special.getCaptcha();
  }

  return (
    <div className={`${styles.notification} ${pass?styles.pass:styles.fail}`}>
    <div className={styles.title}>{title} {pass?'✔':'✘'}  </div>
    <div className={styles.body} dangerouslySetInnerHTML={{__html:body}}></div>
    {/* word guesser */}
    {title.includes('6') && <div className={styles.imageWrapper}>
    {!pass && <Image height={400} width={400} alt="image" src="/assets/images/fire.webp"  className={styles.image} loading="eager"/>}
    {!pass && <Image height={400} width={400} alt="image" src="/assets/images/plus.png" className={styles.image} loading="eager"/>}
   {!pass && <Image height={400} width={400} alt="image" src="/assets/images/fox.png" className={styles.image} loading="eager"/>}
   {pass && <Image height={400} width={400} alt="image" src="/assets/images/firefox.png" className={styles.imageMid} loading="eager"/>}
    </div>}
    {/* wordle */}
    {(title.includes(7)) && <div className={styles.hint}><b>hint:</b> visit - <Link href={"https://www.nytimes.com/games/wordle"} target='_blank' className={styles.link}>wordle</Link> to play and guess what comes next in your password</div>}
    {/* test */}

    {title.includes('8') && <div className={styles.captcha}>
      <div className={styles.captchaCode}>
      {special.captcha}
      </div>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" className={`${styles.newCaptcha}`} onClick={handleCaptchaClick}>
      <path d="M 3.5 2 C 3.372 2 3.2444844 2.0494844 3.1464844 2.1464844 C 2.9514844 2.3414844 2.9514844 2.6585156 3.1464844 2.8535156 L 5.09375 4.8007812 C 3.1950225 6.6199194 2 9.1685121 2 12 C 2 17.511334 6.4886661 22 12 22 C 17.511334 22 22 17.511334 22 12 C 22 6.864114 18.106486 2.6175896 13.109375 2.0644531 A 1.0001 1.0001 0 0 0 13.009766 2.0585938 A 1.0001 1.0001 0 0 0 12.890625 4.0527344 C 16.891514 4.4955979 20 7.871886 20 12 C 20 16.430666 16.430666 20 12 20 C 7.5693339 20 4 16.430666 4 12 C 4 9.7105359 4.967513 7.6643975 6.5039062 6.2109375 L 8.1464844 7.8535156 C 8.3414844 8.0485156 8.6585156 8.0485156 8.8535156 7.8535156 C 8.9515156 7.7565156 9 7.628 9 7.5 L 9 3 A 1 1 0 0 0 8 2 L 3.5 2 z"></path>
      </svg>
      </div>

      }

      {
        title.includes(9) && <div className={styles.hint}>
          <h4>hint:</h4>
          <ul className={styles.moonPhase}>
            <li> New Moon: 🌑</li>
            <li>Waxing Crescent Moon: 🌒</li>
            <li>First Quarter Moon: 🌓</li>
            <li>Waxing Gibbous Moon: 🌔</li>
            <li>Full Moon: 🌕</li>
            <li>Waning Gibbous Moon: 🌖</li>
            <li>Last Quarter Moon: 🌗</li>
            <li>Waning Crescent Moon: 🌘</li>
          </ul>
        </div>
      }
    </div>
  )
}

export default Notify