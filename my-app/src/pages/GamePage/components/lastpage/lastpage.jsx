import deathImg from '../../../../assets/images/Death.svg';
import gameoverImg from '../../../../assets/images/GameOver.svg';
import victoryImg from '../../../../assets/images/Victory.svg';
import Characteristics from '../characteristics/characteristics';
import styles from './lastpage.module.scss';

const LastPage = (props) => {
  const { errorReason } = props;

  const errorCoop = {
    age: {
      src: victoryImg,
      reason:
        'Причин, много может быть у этого результата - но важнее то, что, если и есть у этой игры победа, то это она - поздравляем!',
      text: 'Вы прожили долгую и, надеемся, счастливую жизнь, каждый выбор вёл вас к этому моменту и вы выстояли',
    },
    hunger: {
      src: deathImg,
      reason: 'Кушать следовало все-таки побольше',
      text: 'Судя по всему, вы не слишком много времени уделяли своему внутреннему зверю и не следили за по-настоящему жизненно-важным показателем, советуем в будущем задумываться, прежде чем отказываться от еды ;)',
    },
    money: {
      src: gameoverImg,
      reason: 'Причина проста - денег нет, но вы...',
      text: 'Кажется, будь это тест по финансовой грамотности вы бы с успехом завалили его:(',
    },
    happiness: {
      src: deathImg,
      reason: 'Ваше довольство опустилось до нуля - грустно',
      text: 'Как-то не очень смешно закончилась эта история',
    },
    health: {
      src: gameoverImg,
      reason: 'Здоровье ваше в нуле',
      text: 'Вы смогли опустить свое здоровье до нуля, выглядит как старательная работа',
    },
  };

  return (
    <div className={styles.lastpage}>
      <div className={styles.lastpage_content}>
        <Characteristics health={0} hunger={0} money={0} happiness={0} />
        <div className={styles.reason}>
          {errorCoop[`${errorReason}`].reason}
        </div>
        <div className={styles.img}>
          <img src={errorCoop[`${errorReason}`].src} alt="" />
        </div>
        <div className={styles.description}>
          {errorCoop[`${errorReason}`].text}
        </div>
        <div className={styles.characteristics}>
          <div className={styles.characteristics_content}>
            <div className={styles.buffs}>
              <div className={styles.buffs_item}></div>
              <div className={styles.buffs_item}></div>
              <div className={styles.buffs_item}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastPage;
