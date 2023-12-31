"use client";

import { Question } from "@/types/interfaces";
import { FC, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface CarouselProps {
  questions: Question[];
}

const Carousel: FC<CarouselProps> = ({ questions }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    if (current < questions.length - 1) setCurrent((prev) => ++prev);
  };

  const prevSlide = () => {
    if (current != 0) setCurrent((prev) => --prev);
  };

  return (
    <div className="z-50 flex items-center justify-center">
      <button
        className="z-50 text-white/30 hover:text-white hover:scale-125 transition-all"
        onClick={prevSlide}
      >
        <FiChevronLeft size={20} />
      </button>
      {questions.map((q, i) => {
        if (i == current)
          return (
            <QuestionsContent
              key={i}
              goal={q.goal}
              index={i + 1}
              question={q.question}
            />
          );
      })}
      <button
        className="z-50 text-white/30 hover:text-white hover:scale-125 transition-all"
        onClick={nextSlide}
      >
        <FiChevronRight size={20} />
      </button>
    </div>
  );
};

const QuestionsContent = ({
  index,
  question,
  goal,
}: {
  index: number;
  question: string;
  goal: string;
}) => {
  return (
    <div className="w-auto mx-auto h-1/5 mx-2">
      <h2 className="font-bold text-lg">#{index}</h2>
      <p className="font-light text-xs text-white/50 mt-2">{question}</p>
      <p className="mt-4 font-medium text-sm text-white/50 ml-auto w-fit">
        {goal}
      </p>
    </div>
  );
};

export default Carousel;
