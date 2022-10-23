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
  question: "Мы разве не виделись ранее?",
  answer1: "Даааа... Рад вас видеть;)",
  answer2: "Нет, кто вы?",
};

export const GamePage = () => {
  const [questions, setQuestions] = useState(null);
  const [training, setTraining] = useState(true);
  const [age, setAge] = useState(18);
  const [error, setError] = useState(null);

  const [health, setHealth] = useState(mainStore.health);
  const [happiness, setHappiness] = useState(mainStore.happiness);
  const [money, setMoney] = useState(mainStore.money);
  const [hunger, setHunger] = useState(mainStore.hunger);

  const [currQuest, setCurrQuest] = useState(0);

  const ageIncrementer = (currIncr) => {
    setAge(age + currIncr);
  };

  const endTraining = () => {
    setTraining(false);
  };

  const changeCharacteristicsFirst = () => {
    const newHealth =
      health + (questions !== null && questions !== undefined)
        ? questions[0].eazy.questions[currQuest].answer1.stats.health
        : 0;
    if (newHealth > 0) {
      setHealth(newHealth);
    } else {
      setError("health");
      return;
    }

    const newHappiness =
      happiness +
      (questions !== null && questions !== undefined
        ? questions[0].eazy.questions[currQuest].answer1.stats.happiness
        : 0);
    if (newHappiness > 0) {
      setHappiness(newHappiness);
    } else {
      setError("happiness");
      return;
    }

    const newMoney =
      money +
      (questions !== null && questions !== undefined
        ? questions[0].eazy.questions[currQuest].answer1.stats.money
        : 0);
    if (newMoney > 0) {
      setMoney(newMoney);
    } else {
      setError("mone");
      return;
    }

    const newHunger =
      hunger +
      (questions !== null && questions !== undefined
        ? questions[0].eazy.questions[currQuest].answer1.stats.hunger
        : 0);
    if (newHunger > 0) {
      setHunger(newHunger);
    } else {
      setError("hunger");
      return;
    }

    const newAge =
      age +
      (questions !== null && questions !== undefined
        ? questions[0].eazy.questions[currQuest].answer1.age
        : 0);
    if (newAge < 70) {
      setAge(newAge);
    } else {
      setError("age");
      return;
    }

    setCurrQuest(currQuest + 1);
  };

  const changeCharacteristicsSecond = () => {
    const newHealth =
      health + (questions !== null && questions !== undefined)
        ? questions[0].eazy.questions[currQuest].answer2.stats.health
        : 0;
    if (newHealth > 0) {
      setHealth(newHealth > 100 ? 100 : newHealth);
    } else {
      setError("health");
      return;
    }

    const newHappiness =
      happiness +
      (questions !== null && questions !== undefined
        ? questions[0].eazy.questions[currQuest].answer2.stats.happiness
        : 0);
    if (newHappiness > 0) {
      setHappiness(newHappiness > 100 ? 100 : newHappiness);
    } else {
      setError("happiness");
      return;
    }

    const newMoney =
      money +
      (questions !== null && questions !== undefined
        ? questions[0].eazy.questions[currQuest].answer2.stats.money
        : 0);
    if (newMoney > 0) {
      setMoney(newMoney > 100 ? 100 : newMoney);
    } else {
      setError("money");
      return;
    }

    const newHunger =
      hunger +
      (questions !== null && questions !== undefined
        ? questions[0].eazy.questions[currQuest].answer2.stats.hunger
        : 0);
    if (newHunger > 0) {
      setHunger(newHunger > 100 ? 100 : newHunger);
    } else {
      setError("hunger");
      return;
    }

    const newAge =
      age +
      (questions !== null && questions !== undefined
        ? questions[0].eazy.questions[currQuest].answer2.age
        : 0);
    if (newAge < 70) {
      setAge(newAge);
    } else {
      setError("age");
      return;
    }

    setCurrQuest(currQuest + 1);
  };

  const education = (
    <div className={styles.question}>
      <div className={styles.iconWrap}>
        <img src={icons.sergay.path} className={styles.icon} />
      </div>
      <div className={styles.name}>{icons.sergay.name}</div>
      <div className={styles.question_wrapper}>
        <div className={styles.skip_question}>{skipTraining.text}</div>
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
