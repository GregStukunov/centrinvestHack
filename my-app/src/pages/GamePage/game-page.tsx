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

type IconsPaths = {
  sabath: { name: string; path: string };
  dungeon: { name: string; path: string };
};

const icons: IconsPaths = {
  sabath: { name: "Sabath(Сабатх)", path: Sabath },
  dungeon: { name: "Ван ДаркХолм", path: Dungeon },
};

const skipTraining = {
  question: "Хочешь ли пропустить обучение?",
  answer1: "все понятно...",
  answer2: "нуууу...",
};

const training = {
  description: "",
};

export const GamePage: FC = () => {
  const [questions, setQuestions] = useState(null);
  const [training, setTraining] = useState<boolean>(true);
  const [age, setAge] = useState<number>(0);

  const [health, setHealth] = useState<number>(mainStore.health);
  const [happines, setHappines] = useState<number>(mainStore.happiness);
  const [money, setMoney] = useState<number>(mainStore.money);
  const [hunger, setHunger] = useState<number>(mainStore.hunger);

  const ageIncrementer = (currIncr: number) => {
    setAge(age + currIncr);
  };

  const endTraining = () => {
    ageIncrementer(18);
    setTraining(false);
  };

  useEffect(() => {
    const request = async () => {
      const { data, error } = await supabase.from("test").select("*");
      setQuestions(data);
    };
    request();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>
          <Characteristics health={12} hunger={67} money={90} happiness={100}/>
        </div>
        {training && (
          <div className={styles.question}>
            <div className={styles.iconWrap}>
              <img src={icons.sabath.path} className={styles.icon} />
            </div>
            <div className={styles.name}>{icons.sabath.name}</div>
          <div className={styles.question_wrapper}>
              <div className={styles.skip_question}>{skipTraining.question}</div>
              <div className={styles.buttons}>
                <button onClick={endTraining}>{skipTraining.answer1}</button>
                <button onClick={endTraining}>{skipTraining.answer2}</button>
              </div>   
          </div>
          </div>
        )}
        <div className={styles.characteristics}>
          <div className={styles.characteristics_content}>
            <div className={styles.age}>{age}</div>
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
