import { useState } from "react";

type EducationComponentProps = {
  LastPage: JSX.Element;
};

export const EducationComponent = (props: EducationComponentProps) => {
  const { LastPage } = props;

  const [currentPage, setCurrentPage] = useState<number>(0);
  const arrayOfEducationReplics = [
    "Вы заходите в банк центр инвест, чтобы офорсмить кредитную карту",
    "Берете талон и садитесь на мягкий, приятный диван, ожидая свою очередь",
    "Через некоторое время вы замечаете как к вам приближается безволосый мужчина средних лет",
    "Подойдя к вам он улыбается и произносит бархатным, слегка хриплым голосом",
  ];
  const customHandler = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      {currentPage <= arrayOfEducationReplics.length - 1 && (
        <div>
          {arrayOfEducationReplics[currentPage]}
          <button onClick={customHandler} />
        </div>
      )}
      {currentPage === arrayOfEducationReplics.length - 1 && LastPage}
    </div>
  );
};
