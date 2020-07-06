import React from 'react'
import styles from './Bio.module.css'
import photoURL from '../assets/badge-logo.png';
function Bio(props) {
  // let photoURL = getGravatarURL({
  //   email: "mollybrownultimate@gmail.com",
  //   size: 56,
  // })

  return (
    <div className={`
      ${styles.Bio}
      ${props.className || ''}
    `}>
      <img src={photoURL} alt="Me" />
      <p>
        A public blogging space for current and former Mollies to update, reflect, and share whatever is on their minds.
      </p>
    </div>
  )
}

export default Bio
