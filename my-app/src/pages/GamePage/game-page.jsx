import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import Sabath from "../../assets/images/characters/sabath.svg";
import Dungeon from "../../assets/images/characters/dungeon.svg";
import Dickan from "../../assets/images/characters/dickan.svg";
import Employee from "../../assets/images/characters/employee.svg";
import Girl from "../../assets/images/characters/girl.svg";

import styles from "./game-page.module.scss";
import { mainStore } from "../../store/main-store";
import Characteristics from "./components/characteristics/characteristics";

import { EducationComponent } from "./components/education/education";

const supabase = createClient(
  "https://mnumahwmrmdklgvvmtlf.supabase.co/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1udW1haHdtcm1ka2xndnZtdGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzNjA0MzYsImV4cCI6MTk4MTkzNjQzNn0.P4BIRTYA51C2ikll17z7Ju9RfvQoERwZLTV3xa78yT8"
);

const icons = {
  sergay: { name: "Неизвестный", path: Sabath },
  van: { name: "Ван ДаркХолм", path: Dungeon },
  decan: { name: "Декан", path: Dickan },
  bank_employee: { name: "Сотрудник Банка", path: Employee },
  girl: { name: "Девушка Юля", path: Girl },
};

const skipTraining = {
  question: "Хочешь ли пропустить обучение?",
  answer1: "все понятно...",
  answer2: "нуууу...",
};

export const GamePage = () => {
  const [questions, setQuestions] = useState(null);
  const [training, setTraining] = useState(true);
  const [age, setAge] = useState(0);

  const [health, setHealth] = useState(mainStore.health);
  const [happiness, setHappiness] = useState(mainStore.happiness);
  const [money, setMoney] = useState(mainStore.money);
  const [hunger, setHunger] = useState(mainStore.hunger);

  const [currQuest, setCurrQuest] = useState(0);

  const ageIncrementer = (currIncr) => {
    setAge(age + currIncr);
  };

  const endTraining = () => {
    ageIncrementer(18);
    setTraining(false);
  };

  const changeCharacteristicsFirst = () => {
    setHealth(
      health +
        (questions !== null && questions !== undefined
          ? questions[0].eazy.questions[currQuest].answer1.stats.health
          : 0)
    );
    setHappiness(
      happiness +
        (questions !== null && questions !== undefined
          ? questions[0].eazy.questions[currQuest].answer1.stats.happiness
          : 0)
    );
    setMoney(
      money +
        (questions !== null && questions !== undefined
          ? questions[0].eazy.questions[currQuest].answer1.stats.money
          : 0)
    );
    setHunger(
      hunger +
        (questions !== null && questions !== undefined
          ? questions[0].eazy.questions[currQuest].answer1.stats.hunger
          : 0)
    );

    setAge(
      age +
        (questions !== null && questions !== undefined
          ? questions[0].eazy.questions[currQuest].answer1.age
          : 0)
    );

    setCurrQuest(currQuest + 1);
  };

  const changeCharacteristicsSecond = () => {
    setHealth(
      health +
        (questions !== null && questions !== undefined
          ? questions[0].eazy.questions[currQuest].answer2.stats.health
          : 0)
    );
    setHappiness(
      happiness +
        (questions !== null && questions !== undefined
          ? questions[0].eazy.questions[currQuest].answer2.stats.happiness
          : 0)
    );
    setMoney(
      money +
        (questions !== null && questions !== undefined
          ? questions[0].eazy.questions[currQuest].answer2.stats.money
          : 0)
    );
    setHunger(
      hunger +
        (questions !== null && questions !== undefined
          ? questions[0].eazy.questions[currQuest].answer2.stats.hunger
          : 0)
    );

    setAge(
      age +
        (questions !== null && questions !== undefined
          ? questions[0].eazy.questions[currQuest].age
          : 0)
    );

    setCurrQuest(currQuest + 1);
  };

  const education = (
    <div className={styles.question}>
      <div className={styles.iconWrap}>
        <img src={icons.sergay.path} className={styles.icon} />
      </div>
      <div className={styles.name}>{icons.sergay.name}</div>
      <div className={styles.question_wrapper}>
        <div className={styles.skip_question}>{}</div>
        <div className={styles.buttons}>
          <button onClick={endTraining}>{skipTraining.answer1}</button>
          <button onClick={endTraining}>{skipTraining.answer2}</button>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const request = async () => {
      const { data, error } = await supabase.from("test").select("*");
      if (error) {
        setQuestions(null);
        throw error;
      }
      setQuestions(data);
    };
    request();
    return;
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>
          <Characteristics
            health={health}
            hunger={hunger}
            money={money}
            happiness={happiness}
          />
        </div>
        {training && <EducationComponent LastPage={education} />}
        {!training && (
          <div className={styles.question}>
            <div className={styles.iconWrap}>
              <img
                src={
                  icons[
                    `${
                      questions !== null && questions !== undefined
                        ? questions[0].eazy.questions[currQuest].name
                        : ""
                    }`
                  ].path
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
                      : ""
                  }`
                ].name
              }
            </div>
            <div className={styles.question_wrapper}>
              <div className={styles.skip_question}>
                {questions !== null && questions !== undefined
                  ? questions[0].eazy.questions[currQuest].text
                  : ""}
              </div>
              <div className={styles.buttons}>
                <button onClick={changeCharacteristicsFirst}>
                  {questions !== null && questions !== undefined
                    ? questions[0].eazy.questions[currQuest].answer1.text
                    : ""}
                </button>
                <button onClick={changeCharacteristicsSecond}>
                  {questions !== null && questions !== undefined
                    ? questions[0].eazy.questions[currQuest].answer2.text
                    : ""}
                </button>
              </div>
            </div>
          </div>
        )}
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
  );
};
