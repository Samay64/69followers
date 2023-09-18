import React from 'react'
import styles from '@/styles/SVG.module.css'

const Copy = (props) => {
  return (
    <div  className={styles.svgWrapper} {...props} title='Copy Password'>
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.svg}
      fill="white"
    >
      <path
        d="M8-3v-4a1 1 0 00-1-1H-7a1 1 0 00-1 1V7a1 1 0 001 1h4"
        strokeLinecap="round"
        stroke="#000"
        strokeLinejoin="round"
        transform="matrix(.83 0 0 .83 12 12) translate(-3.5 -3.5)"
      />
      <path
        d="M-8-7a1 1 0 011-1H7a1 1 0 011 1V7a1 1 0 01-1 1H-7a1 1 0 01-1-1V-7z"
        stroke="#000"
        strokeLinejoin="round"
        transform="matrix(.83 0 0 .83 12 12) translate(3.5 3.5)"
      />
    </svg>
    </div>
  )
}

export default Copy