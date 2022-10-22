import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./home-page.module.scss";
import { observer } from "mobx-react-lite";

import PoorSVG from "../../assets/images/Poor.svg";
import NormalSVG from "../../assets/images/Normal.svg";
import RichSVG from "../../assets/images/Rich.svg";

const HomePage = observer(() => {
  const [selectRadioBtn, setSelectRadioBtn] = useState("Poor");
  const isRadioSelected = (value: string): boolean => selectRadioBtn === value;
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectRadioBtn(e.currentTarget.value);

  const poor = "Poor";
  const normal = "Normal";
  const rich = "Rich";

  return (
    <div className={styles.homepage}>
      <div className={styles.homepage_container}>
        <div className={styles.homepage_card}>
          <div className={styles.homepage_title}>Выбери своего персонажа</div>
          <div className={styles.homePage_img}>
            {isRadioSelected(poor) && <img src={PoorSVG} alt="" />}
            {isRadioSelected(normal) && <img src={NormalSVG} alt="" />}
            {isRadioSelected(rich) && <img src={RichSVG} alt="" />}
          </div>

          <div className={styles.characters}>
            <div className={styles.radio_btn}>
              <input
                type="radio"
                id="1"
                name="character"
                value={poor}
                checked={isRadioSelected(poor)}
                onChange={handleRadioClick}
              />
              <label
                className={`${isRadioSelected(poor) && styles.label}`}
                htmlFor="1"
              >
                Бедняк
              </label>
            </div>
            <div className={styles.radio_btn}>
              <input
                type="radio"
                id="2"
                name="character"
                value={normal}
                checked={isRadioSelected(normal)}
                onChange={handleRadioClick}
              />
              <label
                className={`${isRadioSelected(normal) && styles.label}`}
                htmlFor="2"
              >
                Средний
              </label>
            </div>
            <div className={styles.radio_btn}>
              <input
                type="radio"
                id="3"
                name="character"
                value={rich}
                checked={isRadioSelected(rich)}
                onChange={handleRadioClick}
              />
              <label
                className={`${isRadioSelected(rich) && styles.label}`}
                htmlFor="3"
              >
                Богатый
              </label>
            </div>
          </div>

          <div className={styles.btn_wrapper}>
            <div
              className={`${isRadioSelected(poor) && styles.red} ${
                isRadioSelected(normal) && styles.yellow
              } ${isRadioSelected(rich) && styles.green}`}
            >
              <NavLink to="/game">Начать Игру</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HomePage;
