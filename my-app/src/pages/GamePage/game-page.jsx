import { useEffect, useState, useMemo } from 'react';

import { createClient } from '@supabase/supabase-js';
import { observer } from 'mobx-react-lite';

import Dickan from '../../assets/images/characters/dickan.svg';
import Dungeon from '../../assets/images/characters/dungeon.svg';
import Employee from '../../assets/images/characters/employee.svg';
import Event from '../../assets/images/characters/event.svg';
import Girl from '../../assets/images/characters/girl.svg';
import Sabath from '../../assets/images/characters/sabath.svg';
import { mainStore } from '../../store/main-store';
import Characteristics from './components/characteristics/characteristics';
import { EducationComponent } from './components/education/education';
import LastPage from './components/lastpage/lastpage';
import styles from './game-page.module.scss';

const supabase = createClient(
  'https://mnumahwmrmdklgvvmtlf.supabase.co/',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1udW1haHdtcm1ka2xndnZtdGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzNjA0MzYsImV4cCI6MTk4MTkzNjQzNn0.P4BIRTYA51C2ikll17z7Ju9RfvQoERwZLTV3xa78yT8'
);

const icons = {
  sergay: { name: 'Неизвестный', path: Sabath },
  van: { name: 'Ван ДаркХолм', path: Dungeon },
  decan: { name: 'Декан', path: Dickan },
  bank_employee: { name: 'Сотрудник Банка', path: Employee },
  girl: { name: 'Девушка Юля', path: Girl },
  event: { name: 'Событие', path: Event },
};

export const GamePage = observer(() => {
  const [questions, setQuestions] = useState(null);
  const [training, setTraining] = useState(true);
  const [age, setAge] = useState(18);
  const [error, setError] = useState(null);

  const [currQuest, setCurrQuest] = useState(0);

  useEffect(() => {
    const request = async () => {
      const { data, error } = await supabase.from('test').select('*');
      if (error) {
        setQuestions(null);
        throw error;
      }
      setQuestions(data);
    };
    request();
    console.log(questions);
    return;
  }, [questions]);

  const changeCharacteristicsFirst = () => {
    const newHealth =
      mainStore.health +
      questions[0].eazy.questions[currQuest].answer2.stats.health;
    if (newHealth > 0) {
      mainStore.health = newHealth;
    } else {
      setError('health');
      return;
    }

    const newHappiness =
      mainStore.happiness +
      questions[0].eazy.questions[currQuest].answer2.stats.happiness;
    if (newHappiness > 0) {
      mainStore.happiness = newHappiness;
    } else {
      setError('happiness');
      return;
    }

    const newMoney =
      mainStore.money +
      questions[0].eazy.questions[currQuest].answer2.stats.money;
    if (newMoney > 0) {
      mainStore.money = newMoney;
    } else {
      setError('money');
      return;
    }

    const newHunger =
      mainStore.hunger +
      questions[0].eazy.questions[currQuest].answer2.stats.hunger;
    if (newHunger > 0) {
      mainStore.hunger = newHunger;
    } else {
      setError('hunger');
      return;
    }

    const newAge = age + questions[0].eazy.questions[currQuest].age;
    if (newAge < 70) {
      setAge(newAge);
    } else {
      setError('age');
      return;
    }

    setCurrQuest(currQuest + 1);
  };

  const changeCharacteristicsSecond = () => {
    const newHealth =
      mainStore.health +
      questions[0].eazy.questions[currQuest].answer1.stats.health;
    if (newHealth > 0) {
      mainStore.health = newHealth;
    } else {
      setError('health');
      return;
    }

    const newHappiness =
      mainStore.happiness +
      questions[0].eazy.questions[currQuest].answer1.stats.happiness;
    if (newHappiness > 0) {
      mainStore.happiness = newHappiness;
    } else {
      setError('happiness');
      return;
    }

    const newMoney =
      mainStore.money +
      questions[0].eazy.questions[currQuest].answer2.stats.money;
    if (newMoney > 0) {
      mainStore.money = newMoney;
    } else {
      setError('money');
      return;
    }

    const newHunger =
      mainStore.hunger +
      questions[0].eazy.questions[currQuest].answer2.stats.hunger;
    if (newHunger > 0) {
      mainStore.hunger = newHunger;
    } else {
      setError('hunger');
      return;
    }

    const newAge = age + questions[0].eazy.questions[currQuest].age;
    if (newAge < 60) {
      setAge(newAge);
    } else {
      setError('age');
      return;
    }

    setCurrQuest(currQuest + 1);
  };

  const currentQuestionImgSrc = useMemo(
    () => icons[questions[0].eazy.questions[currQuest].name].path,
    [questions, currQuest]
  );

  return !Boolean(error) ? (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>
          <Characteristics
            health={mainStore.health}
            hunger={mainStore.hunger}
            money={mainStore.money}
            happiness={mainStore.happiness}
          />
        </div>
        {training && !Boolean(error) && (
          <EducationComponent setFinished={setTraining} />
        )}
        {!training && !Boolean(error) && (
          <div className={styles.question}>
            <div className={styles.iconWrap}>
              <img
                src={
                  icons[
                    `${
                      questions !== null && questions !== undefined
                        ? questions[0].eazy.questions[currQuest].name
                        : ''
                    }`
                  ].name
                }
                className={styles.icon}
              />
            </div>
            <div className={styles.name}>
              {
                icons[
                  `${
                    questions !== null && questions !== undefined
                      ? questions[0].eazy.questions[currQuest].name
                      : ''
                  }`
                ].name
              }
            </div>
            <div className={styles.question_wrapper}>
              <div className={styles.skip_question}>
                {questions !== null && questions !== undefined
                  ? questions[0].eazy.questions[currQuest].text
                  : ''}
              </div>
              <div className={styles.buttons}>
                <button onClick={changeCharacteristicsFirst}>
                  {questions !== null && questions !== undefined
                    ? questions[0].eazy.questions[currQuest].answer1.text
                    : ''}
                </button>
                <button onClick={changeCharacteristicsSecond}>
                  {questions !== null && questions !== undefined
                    ? questions[0].eazy.questions[currQuest].answer2.text
                    : ''}
                </button>
              </div>
            </div>
          </div>
        )}
        <div className={styles.characteristics}>
          <div className={styles.characteristics_content}>
            <div className={styles.age}>{age + ' лет'}</div>
            <div className={styles.buffs}>
              <div className={styles.buffs_item}></div>
              <div className={styles.buffs_item}></div>
              <div className={styles.buffs_item}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LastPage errorReason={error} />
  );
});
