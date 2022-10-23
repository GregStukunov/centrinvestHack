import { FC, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import Sabath from "../../assets/images/characters/sabath.svg";
import Dungeon from "../../assets/images/characters/dungeon.svg";

import styles from "./game-page.module.scss";
import { mainStore } from "../../store/main-store";
import Characteristics from "./components/characteristics/characteristics";

const supabase = createClient(
  "https://mnumahwmrmdklgvvmtlf.supabase.co/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1udW1haHdtcm1ka2xndnZtdGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzNjA0MzYsImV4cCI6MTk4MTkzNjQzNn0.P4BIRTYA51C2ikll17z7Ju9RfvQoERwZLTV3xa78yT8"
);

const icons = {
  sabath: { name: "Sabath(Сабатх)", path: Sabath },
  van: { name: "Ван ДаркХолм", path: Dungeon },
};

const skipTraining = {
  question: "Хочешь ли пропустить обучение?",
  answer1: "все понятно...",
  answer2: "нуууу...",
};

type Question = {
  name: "van" | "sabath";
  text: string;
  answer1: {
    text: string;
    stats: {
      health: number;
      happiness: number;
      money: number;
      hunger: number;
    };
    age: number;
  };
  answer2: {
    text: string;
    stats: {
      health: number;
      happiness: number;
      money: number;
      hunger: number;
    };
    age: number;
  };
};

type QuestionsType = Array<{
  eazy: { questions: Array<Question> };
}>;

export const GamePage: FC = () => {
  const [questions, setQuestions] = useState<QuestionsType | null>(null);
  const [training, setTraining] = useState<boolean>(true);
  const [age, setAge] = useState<number>(0);

  const [health, setHealth] = useState<number>(mainStore.health);
  const [happiness, setHappiness] = useState<number>(mainStore.happiness);
  const [money, setMoney] = useState<number>(mainStore.money);
  const [hunger, setHunger] = useState<number>(mainStore.hunger);

  const [currQuest, setCurrQuest] = useState<number>(0);

  const ageIncrementer = (currIncr: number) => {
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
          ? questions[0].eazy.questions[currQuest].answer2.age
          : 0)
    );

    setCurrQuest(currQuest + 1);
  };

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
    console.log(questions);
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
        {training && (
          <div className={styles.question}>
            <div className={styles.iconWrap}>
              <img src={icons.sabath.path} className={styles.icon} />
            </div>
            <div className={styles.name}>{icons.sabath.name}</div>
            <div className={styles.question_wrapper}>
              <div className={styles.skip_question}>{}</div>
              <div className={styles.buttons}>
                <button onClick={endTraining}>{skipTraining.answer1}</button>
                <button onClick={endTraining}>{skipTraining.answer2}</button>
              </div>
            </div>
          </div>
        )}
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
            <div className={styles.age}>{age + "лет"}</div>
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
