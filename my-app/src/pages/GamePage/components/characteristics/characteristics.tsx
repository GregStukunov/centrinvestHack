import cn from 'classnames';
import React from 'react';

import { observer } from 'mobx-react-lite';

import happinessImg from '../../../../assets/images/Happiness.svg';
import healthImg from '../../../../assets/images/Health.svg';
import hungerImg from '../../../../assets/images/Hunger.svg';
import moneyImg from '../../../../assets/images/Money.svg';
import styles from './characteristics.module.scss';

type Props = {
  health: number;
  hunger: number;
  money: number;
  happiness: number;
};

const Characteristics = observer(
  ({ health, hunger, money, happiness }: Props) => {
    const healthTheme = cn({
      [styles.red]: health <= 40,
      [styles.yellow]: health <= 70,
      [styles.green]: health <= 100,
    });
    const hungerTheme = cn({
      [styles.red]: hunger <= 40,
      [styles.yellow]: hunger <= 70,
      [styles.green]: hunger <= 100,
    });
    const moneyTheme = cn({
      [styles.red]: money <= 40,
      [styles.yellow]: money <= 70,
      [styles.green]: money <= 100,
    });
    const happinessTheme = cn({
      [styles.red]: happiness <= 40,
      [styles.yellow]: happiness <= 70,
      [styles.green]: happiness <= 100,
    });

    return (
      <div className={styles.characteristics}>
        <div className={styles.characteristics_container}>
          <div className={styles.characteristics_item}>
            <img src={healthImg} alt="" className={healthTheme} />
            <div>{health}</div>
          </div>
          <div className={styles.characteristics_item}>
            <img src={hungerImg} alt="" className={hungerTheme} />
            <div>{hunger}</div>
          </div>
          <div className={styles.characteristics_item}>
            <img src={moneyImg} alt="" className={moneyTheme} />
            <div>{money}</div>
          </div>
          <div className={styles.characteristics_item}>
            <img src={happinessImg} alt="" className={happinessTheme} />
            <div>{happiness}</div>
          </div>
        </div>
      </div>
    );
  }
);

export default Characteristics;
