import React from 'react'
import Characteristics from '../characteristics/characteristics'
import styles from './lastpage.module.scss'

import deathImg from '../../../../assets/images/Death.svg'
import gameoverImg from '../../../../assets/images/GameOver.svg'
import victoryImg from '../../../../assets/images/Victory.svg'

const Lastpage = ({img, reason, description,age}) => {
  return (
    <div className={styles.lastpage}>
        <div className={styles.lastpage_content}>
            <Characteristics health={0} hunger={0} money={0} happiness={0}/>
            <div className={styles.reason}>
            {`У вас закончилось ${reason}, поэтому вы направляетесь на кладбище`}
            </div>
            <div className={styles.img}>
              <img src={img} alt="" />
            </div>
            <div className={styles.description}>
              {description}
            </div>
            <div className={styles.characteristics}>
            <div className={styles.characteristics_content}>
            <div className={styles.age}>{age + " лет"}</div>
            <div className={styles.buffs}>
              <div className={styles.buffs_item}></div>
              <div className={styles.buffs_item}></div>
              <div className={styles.buffs_item}></div>
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Lastpage