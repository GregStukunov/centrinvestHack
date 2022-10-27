import { useState } from 'react';

import styles from './education.module.scss';

type EducationComponentProps = {
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EducationComponent = (props: EducationComponentProps) => {
  const { setFinished } = props;

  const [currentPage, setCurrentPage] = useState<number>(0);
  const arrayOfEducationReplics = [
    'Вы заходите в банк центр инвест, чтобы офорсмить кредитную карту',
    'Берете талон и садитесь на мягкий, приятный диван, ожидая свою очередь',
    'Через некоторое время вы замечаете как к вам приближается безволосый мужчина средних лет',
    'Подойдя к вам он улыбается и произносит бархатным, слегка хриплым голосом',
  ];
  const customHandler = () => {
    if (currentPage === arrayOfEducationReplics.length - 1) {
      setFinished(false);
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div className={styles.education}>
        <div className={styles.text}>
          {arrayOfEducationReplics[currentPage]}
        </div>
        <button onClick={customHandler}>Далее</button>
      </div>
    </div>
  );
};
