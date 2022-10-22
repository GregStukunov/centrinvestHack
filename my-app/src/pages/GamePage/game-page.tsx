import { FC, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import styles from "./game-page.module.scss";

const supabase = createClient(
  "https://mnumahwmrmdklgvvmtlf.supabase.co/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1udW1haHdtcm1ka2xndnZtdGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzNjA0MzYsImV4cCI6MTk4MTkzNjQzNn0.P4BIRTYA51C2ikll17z7Ju9RfvQoERwZLTV3xa78yT8"
);

export const GamePage: FC = () => {
  const [questions, setQuestions] = useState();

  const [health, setHealth] = useState();
  const [happines, setHappines] = useState();
  const [money, setMoney] = useState();
  const [hunger, setHunger] = useState();

  useEffect(() => {
    const request = async () => {
      const { data, error } = await supabase.from("test").select("*");
      setQuestions(data);
    };
    request();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}></div>
    </div>
  );
};
