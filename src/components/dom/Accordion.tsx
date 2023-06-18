import React from "react";

interface Props {
  key?: number;
  index?: number;
  title?: string;
  description?: string;
  setModal?: (modal: { active?: boolean; index?: number }) => void;
}

const index: React.FC<Props> = ({ index, title, description, setModal }) => {
  return (
    <div
      // i dont know what is it for
      // onMouseEnter={() => setModal({ active: true, index })}
      // onMouseLeave={() => setModal({ active: false, index })}
      className="flex w-[60vw] pt-[30px] pr-[30px] pb-[30px] pl-[30px] items-center justify-between
        border-t-2 cursor-pointer hover:opacity-25 transition-all duration-200 ease-linear"
    >
      <h2 className="text-3xl font-bold hover:-translate-x-3 transition-all duration-200 ease-linear">
        {title}
      </h2>
      <p className="font-light hover:translate-x-3 transition-all duration-200 ease-linear">
        {description}
      </p>
    </div>
  );
};

export default index;
